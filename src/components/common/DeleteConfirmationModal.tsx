import React from "react";
import { Modal } from "../ui/Modal";
import { Trash } from "@phosphor-icons/react";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  entity?: string;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ onClose, onConfirm, title, entity }) => {
  const handleDelete = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={title}
      submitButton={{ label: "Delete", onClick: handleDelete }}
      cancelButton={{ label: "Cancel", onClick: onClose }}
    >
      <div className="py-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Trash size={24} className="text-red-600 dark:text-red-500" />
          </div>
        </div>

        <p className="text-center text-gray-700 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{entity}</span>?
        </p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};
