import React, { useState } from "react";
import { Task } from "../../types/boards";
import { Trash } from "@phosphor-icons/react";
import { useBoardStore } from "../../store/boardStore";
import { DeleteConfirmationModal } from "../../components/common/DeleteConfirmationModal";
import { TaskModal } from "./TaskModal";

interface TaskCardProps {
  task: Task;
  boardId: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, boardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteTask } = useBoardStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the task modal
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteTask(boardId, task.id);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-700 p-3 rounded-md shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
            {task.title}
          </h4>

          <button
            onClick={handleOpenDeleteModal}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
          >
            <Trash size={20} />
          </button>
        </div>
        {task.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-600 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ID: {task.id.substring(0, 4)}
          </span>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal onClose={handleCloseModal} task={task} boardId={boardId} />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
          entity={task.title}
          title="Delete Task"
        />
      )}
    </>
  );
};
