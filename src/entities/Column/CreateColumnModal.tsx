import React, { useState, useMemo } from "react";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { useBoardStore } from "../../store/boardStore";
interface CreateColumnModalProps {
  onClose: () => void;
  boardId: string;
}

export const CreateColumnModal: React.FC<CreateColumnModalProps> = ({
  onClose,
  boardId,
}) => {
  const [title, setTitle] = useState("");

  const { addColumn } = useBoardStore();

  const isValid = useMemo(() => title.trim() !== "", [title]);

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }

    addColumn(boardId, title);
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Add New Column"
      submitButton={{
        label: "Create",
        onClick: handleSubmit,
        disabled: !isValid,
      }}
    >
      <div className="space-y-4">
        <div>
          <Input
            label="Column Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter column name"
          />
        </div>
      </div>
    </Modal>
  );
};
