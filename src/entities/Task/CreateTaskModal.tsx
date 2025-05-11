import React, { useMemo, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { ColumnSelect } from "../Column/ColumnSelect";
import { useBoardStore } from "../../store/boardStore";
interface CreateTaskModalProps {
  onClose: () => void;
  boardId: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  onClose,
  boardId,
}) => {
  const { addTask } = useBoardStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState("");

  const isValid = useMemo(() => title.trim() !== "", [title]);

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }

    addTask(boardId, {
      title: title.trim(),
      description: description.trim(),
      columnId,
      status: columnId,
      tableId: boardId,
    });
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Create New Task"
      submitButton={{
        label: "Create",
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
