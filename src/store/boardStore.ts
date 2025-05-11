import { create } from "zustand";
import { Board, Task, Column } from "../types/boards";
import initialData from "../data.json";

import { v4 as uuidv4 } from "uuid";

interface BoardStore {
  boards: Board[];
  createBoard: (name: string) => void;
  updateBoard: (id: string, name: string) => void;
  deleteBoard: (id: string) => void;
  addTask: (boardId: string, task: Omit<Task, "id">) => void;
  updateTask: (boardId: string, taskId: string, task: Partial<Task>) => void;
  deleteTask: (boardId: string, taskId: string) => void;
  moveTask: (boardId: string, taskId: string, newColumnId: string) => void;
  addColumn: (boardId: string, title: string) => void;
  getTasksForBoard: (boardId: string) => Task[];
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: initialData.boards,

  createBoard: (name: string) =>
    set((state) => {
      const newBoard: Board = {
        id: uuidv4(),
        name,
        columns: [
          { id: "todo", title: "To Do" },
          { id: "doing", title: "Doing" },
          { id: "done", title: "Done" },
        ],
        tasks: [],
      };
      return { boards: [...state.boards, newBoard] };
    }),

  updateBoard: (id: string, name: string) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id ? { ...board, name } : board
      ),
    })),

  deleteBoard: (id: string) =>
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    })),

  addTask: (boardId: string, task: Omit<Task, "id">) =>
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id === boardId) {
          const newTask: Task = {
            ...task,
            id: uuidv4(),
          };
          return {
            ...board,
            tasks: [...board.tasks, newTask],
          };
        }
        return board;
      }),
    })),

  updateTask: (boardId: string, taskId: string, taskUpdate: Partial<Task>) =>
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === taskId ? { ...task, ...taskUpdate } : task
            ),
          };
        }
        return board;
      }),
    })),

  deleteTask: (boardId: string, taskId: string) =>
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        return board;
      }),
    })),

  moveTask: (boardId: string, taskId: string, newColumnId: string) =>
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === taskId
                ? { ...task, columnId: newColumnId, status: newColumnId }
                : task
            ),
          };
        }
        return board;
      }),
    })),

  getTasksForBoard: (boardId: string) =>
    get().boards.find((board) => board.id === boardId)?.tasks || [],

  

  addColumn: (boardId: string, title: string) =>
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id === boardId) {
          const newColumn: Column = {
            id: uuidv4(),
            title,
          };
          return {
            ...board,
            columns: [...board.columns, newColumn],
          };
        }
        return board;
      }),
    })),
}));
