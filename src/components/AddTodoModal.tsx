
import { useState } from "react";
import { TodoPriority } from "@/types/Todo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (todo: {
    title: string;
    description: string;
    priority: TodoPriority;
    dueDate: Date | null;
  }) => void;
}

const AddTodoModal = ({ isOpen, onClose, onAddTodo }: AddTodoModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dateOpen, setDateOpen] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAddTodo({
      title,
      description,
      priority,
      dueDate,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate(null);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-inter">Add New Todo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              maxLength={50}
            />
            <div className="text-xs text-right text-gray-500">
              {title.length}/50
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add additional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label>Priority</Label>
            <RadioGroup
              value={priority}
              onValueChange={(value) => setPriority(value as TodoPriority)}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-green-700">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-orange-700">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-red-700">High</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label>Due Date</Label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate as Date}
                  onSelect={(date) => {
                    setDueDate(date);
                    setDateOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Add Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
