import React from "react";
import { Column as ColumnType, Task } from "../../types/boards";
import { TaskCard } from "../Task/TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <div className="flex-shrink-0 w-72 h-full flex flex-col bg-gray-100 dark:bg-gray-800 rounded-md">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 rounded-t-md">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            {column.title}
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {tasks.length === 0 ? (
          <div className="h-20 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            No tasks yet
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} boardId={task.tableId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
