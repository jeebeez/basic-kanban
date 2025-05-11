export interface Task {
  id: string;
  title: string;
  tableId: string;
  columnId: string;
  description?: string;
  status: string; // must match one of the column keys
}

// A column/status on the board
export interface Column {
  id: string; // e.g. "todo", "doing", "done", etc.
  title: string; // human-readable name
}

// A full board, with its columns and a map of tasks
export interface Board {
  id: string;
  name: string;
  columns: Column[];
  tasks: Task[];
}
