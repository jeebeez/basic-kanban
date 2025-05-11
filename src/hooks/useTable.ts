import { useBoardStore } from "../store/boardStore";

export function useBoards() {
  const {
    boards,
    createBoard: create,
    updateBoard: update,
    deleteBoard: remove,
  } = useBoardStore();

  return {
    boards,
    create: (name: string) => create(name),
    update: (id: string, name: string) => update(id, name),
    remove: (id: string) => remove(id),
  };
}

export function useBoard(boardId: string | undefined) {
  const { boards } = useBoardStore();
  const board = boardId ? boards.find((b) => b.id === boardId) : undefined;

  return { board };
}

export function useTasks(boardId: string | undefined) {
  const { addTask, updateTask, deleteTask, moveTask } = useBoardStore();
  const { board } = useBoard(boardId);
  const tasks = board?.tasks || [];

  return {
    tasks,
    addTask: (task: Omit<Parameters<typeof addTask>[1], "id">) => {
      if (boardId) addTask(boardId, task);
    },
    updateTask: (taskId: string, update: Parameters<typeof updateTask>[2]) => {
      if (boardId) updateTask(boardId, taskId, update);
    },
    deleteTask: (taskId: string) => {
      if (boardId) deleteTask(boardId, taskId);
    },
    moveTask: (taskId: string, columnId: string) => {
      if (boardId) moveTask(boardId, taskId, columnId);
    },
  };
}
