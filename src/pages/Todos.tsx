
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/types/Todo";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";
import AddTodoModal from "@/components/AddTodoModal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Todos = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const fetchTodos = async () => {
    if (!user) throw new Error("User not authenticated");
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Convert database rows to Todo objects
    return data.map((task): Todo => ({
      id: task.id,
      title: task.title,
      description: task.description || "",
      completed: task.completed,
      dueDate: task.due_date ? new Date(task.due_date) : null,
      priority: (task.priority || "medium") as "low" | "medium" | "high",
      createdAt: new Date(task.created_at)
    }));
  };

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos', user?.id],
    queryFn: fetchTodos,
    enabled: !!user
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id);
        
      if (error) throw error;
      return { id, completed };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', user?.id] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update task: ${error.message}`);
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', user?.id] });
      toast.success("Task deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to delete task: ${error.message}`);
    }
  });

  const addTaskMutation = useMutation({
    mutationFn: async (taskData: {
      title: string;
      description: string;
      priority: "low" | "medium" | "high";
      dueDate: Date | null;
    }) => {
      // Format the due date as an ISO string if it exists, or null if it doesn't
      const formattedDueDate = taskData.dueDate ? taskData.dueDate.toISOString() : null;
      
      const { error } = await supabase
        .from('tasks')
        .insert({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          due_date: formattedDueDate,
          user_id: user?.id
        });
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', user?.id] });
      toast.success("Task added successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to add task: ${error.message}`);
    }
  });

  const handleToggleComplete = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      toggleTaskMutation.mutate({ id, completed: !todo.completed });
    }
  };

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const handleAddTodo = (todoData: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: Date | null;
  }) => {
    addTaskMutation.mutate(todoData);
  };

  const handleGenerateSummary = () => {
    // Save todos to session storage to access in the Summary page
    sessionStorage.setItem("todos", JSON.stringify(todos));
    navigate("/summary");
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-lg mx-auto">
            <h2 className="text-xl font-medium text-red-800 mb-2">Error loading tasks</h2>
            <p className="text-red-700">{(error as Error).message}</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['todos'] })} className="mt-4">
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-inter font-bold mb-4 md:mb-0">My Tasks</h1>
            <Button
              onClick={handleGenerateSummary}
              className="bg-success hover:bg-success/90"
              disabled={todos.length === 0}
            >
              Generate Summary
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onNewTodo={() => setIsAddModalOpen(true)}
            />
          )}
        </div>
      </main>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTodo={handleAddTodo}
      />
    </div>
  );
};

export default Todos;
