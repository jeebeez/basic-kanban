import React, { useState, useMemo } from "react";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Task } from "../../types/boards";
import { useBoardStore } from "../../store/boardStore";
import { ColumnSelect } from "../Column/ColumnSelect";

interface TaskModalProps {
  onClose: () => void;
  task: Task;
  boardId: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  task,
  boardId,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [columnId, setColumnId] = useState(task.columnId);

  const { updateTask } = useBoardStore();

  const isValid = useMemo(() => title.trim() !== "", [title]);

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }

    if (!task) {
      return;
    }

    // Update task using the boardStore
    updateTask(boardId, task.id, {
      title: title.trim(),
      description: description.trim(),
      columnId,
      status: columnId,
    });

    onClose();
  };

  if (!task) {
    return null;
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Edit Task"
      submitButton={{
        label: "Save Changes",
        onClick: handleSubmit,
        disabled: !isValid,
      }}
      cancelButton={{ label: "Cancel", onClick: onClose }}
    >
      <div className="space-y-4">
        <div>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] resize-none"
          />
        </div>

        <ColumnSelect
          boardId={boardId}
          value={columnId}
          onChange={setColumnId}
        />
      </div>
    </Modal>
  );
};
