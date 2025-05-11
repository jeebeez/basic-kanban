import React, { useMemo, useState } from "react";
import { Board, Task } from "../../types/boards";
import { Column } from "../Column/Column";
import { Button } from "../../components/ui/Button";
import { CreateTaskModal } from "../Task/CreateTaskModal";
import { CreateColumnModal } from "../Column/CreateColumnModal";
import { useBoardStore } from "../../store/boardStore";
import { Trash } from "@phosphor-icons/react";
import { DeleteConfirmationModal } from "../../components/common/DeleteConfirmationModal";

interface BoardContainerProps {
  board: Board;
}

export const BoardContainer: React.FC<BoardContainerProps> = ({ board }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteBoard } = useBoardStore();

  const handleDeleteBoard = () => {
    deleteBoard(board.id);
  };

  // ideally would be an api to get columns for a task inside the Column component
  const columnTasksMap = useMemo(() => {
    return board.tasks.reduce((acc, task) => {
      acc[task.columnId] = [...(acc[task.columnId] || []), task];
      return acc;
    }, {} as Record<string, Task[]>);
  }, [board.tasks]);

  if (!board) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Select a board to view its contents
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {board.name}
        </h1>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setIsAddingTask(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            + Add Task
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 flex items-center space-x-1 px-3"
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex h-full space-x-4">
          {board.columns.map((column) => {
            const columnTasks = columnTasksMap[column.id] || [];

            return (
              <Column key={column.id} column={column} tasks={columnTasks} />
            );
          })}

          {/* Add Column Button */}
          <div
            className="flex-shrink-0 w-72 h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors"
            onClick={() => setIsAddingColumn(true)}
          >
            <div className="text-center p-4">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Add New Column
              </p>
            </div>
          </div>
        </div>
      </div>

      {isAddingTask && (
        <CreateTaskModal
          onClose={() => setIsAddingTask(false)}
          boardId={board.id}
        />
      )}

      {isAddingColumn && (
        <CreateColumnModal
          onClose={() => setIsAddingColumn(false)}
          boardId={board.id}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteBoard}
          entity={board.name}
          title="Delete Board"
        />
      )}
    </div>
  );
};
