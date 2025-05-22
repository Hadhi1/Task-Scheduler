
import { useState } from "react";
import { Todo, TodoPriority } from "@/types/Todo";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggleComplete, onDelete }: TodoItemProps) => {
  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3 animate-scale-in">
      <div className="flex items-start">
        <Checkbox
          className="mt-1 mr-3"
          checked={todo.completed}
          onCheckedChange={() => onToggleComplete(todo.id)}
        />
        <div className="flex-grow">
          <div className="flex justify-between">
            <h3
              className={cn(
                "font-inter font-medium text-lg transition-all duration-200",
                todo.completed && "line-through text-gray-400"
              )}
            >
              {todo.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-destructive"
              onClick={() => onDelete(todo.id)}
            >
              <Trash size={16} />
            </Button>
          </div>
          {todo.description && (
            <p
              className={cn(
                "text-gray-600 mt-1",
                todo.completed && "line-through text-gray-400"
              )}
            >
              {todo.description}
            </p>
          )}
          <div className="flex mt-2 flex-wrap gap-2">
            {todo.dueDate && (
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2 py-1">
                Due: {format(todo.dueDate, "MMM d, yyyy")}
              </span>
            )}
            <span
              className={cn(
                "text-xs rounded-full px-2 py-1 border",
                getPriorityColor(todo.priority)
              )}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
