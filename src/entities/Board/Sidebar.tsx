import React, { useState } from "react";
import { Board } from "../../types/boards";
import { Button } from "../../components/ui/Button";
import { CreateBoardModal } from "./CreateBoardModal";
import { Kanban } from "@phosphor-icons/react";

interface SidebarProps {
  boards: Board[];
  activeBoard?: string;
  onSelectBoard: (boardId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  boards,
  activeBoard,
  onSelectBoard,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:w-64 h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Kanban size={24} /> Kanban
        </div>
        <Button
          onClick={handleOpenModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white "
        >
          + New
        </Button>
      </div>

      <div className="overflow-y-auto flex-grow">
        {boards.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No boards yet. Create one to get started.
          </p>
        ) : (
          <div className="space-y-1">
            {boards.map((board) => (
              <div
                key={board.id}
                className={`px-3 py-2 rounded-md cursor-pointer transition-colors
                  ${
                    activeBoard === board.id
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                onClick={() => onSelectBoard(board.id)}
              >
                <div className="flex items-center gap-2">
                  <Kanban size={24} />
                  {board.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateBoardModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
