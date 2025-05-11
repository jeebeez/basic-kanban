import React, { useMemo } from "react";
import { useBoard } from "../../hooks/useTable";

interface ColumnSelectProps {
  boardId: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const ColumnSelect: React.FC<ColumnSelectProps> = ({
  boardId,
  value,
  onChange,
  label = "Status",
  className = "",
}) => {
  const { board } = useBoard(boardId);
  const columns = useMemo(() => board?.columns || [], [board]);

  // Set first column as default if no value is provided and columns exist
  React.useEffect(() => {
    if (!value && columns.length > 0) {
      onChange(columns[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!board || columns.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </select>
    </div>
  );
};
