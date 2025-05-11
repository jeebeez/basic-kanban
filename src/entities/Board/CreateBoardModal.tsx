import React, { useMemo, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { useBoards } from "../../hooks/useTable";
interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");

  const isValid = useMemo(() => name.trim() !== "", [name]);

  const { create } = useBoards();

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }

    create(name);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Board"
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
            label="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter board name"
          />
        </div>
      </div>
    </Modal>
  );
};
