"use client";

import { useState } from "react";
import { useBoards, useBoard } from "../hooks/useTable";
import { Sidebar } from "../entities/Board/Sidebar";
import { BoardContainer } from "../entities/Board/BoardContainer";

export default function Home() {
  const { boards } = useBoards();
  const [activeBoard, setActiveBoard] = useState<string>(boards[0]?.id);
  const { board } = useBoard(activeBoard);

  const handleSelectBoard = (boardId: string) => {
    setActiveBoard(boardId);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      <div className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
        <Sidebar
          boards={boards}
          activeBoard={activeBoard}
          onSelectBoard={handleSelectBoard}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        {board ? (
          <BoardContainer board={board} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a board or create a new one to get started
          </div>
        )}
      </div>
    </div>
  );
}
