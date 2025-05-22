
import { useState } from "react";
import { Todo } from "@/types/Todo";
import TodoItem from "./TodoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onNewTodo: () => void;
}

const TodoList = ({ todos, onToggleComplete, onDelete, onNewTodo }: TodoListProps) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    const matchesSearch =
      searchQuery.trim() === "" ||
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onNewTodo} className="bg-primary hover:bg-primary/90">
          <Plus size={16} className="mr-1" />
          New Todo
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger
            value="all"
            onClick={() => setFilter("all")}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="active"
            onClick={() => setFilter("active")}
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            onClick={() => setFilter("completed")}
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="font-inter font-medium text-xl mb-2">No todos found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "No todos match your search"
                  : "Add a new todo to get started"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={onNewTodo}
                  className="mt-4 bg-primary hover:bg-primary/90"
                >
                  <Plus size={16} className="mr-1" />
                  New Todo
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          {/* Same as All tab but filtered by active */}
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-inter font-medium text-xl mb-2">All caught up!</h3>
              <p className="text-gray-500">You have no active todos.</p>
              <Button
                onClick={onNewTodo}
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                <Plus size={16} className="mr-1" />
                New Todo
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          {/* Same as All tab but filtered by completed */}
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-inter font-medium text-xl mb-2">No completed todos</h3>
              <p className="text-gray-500">Complete some todos to see them here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
