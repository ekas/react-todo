import { Task } from "../models/task";

export const getAllTasks = async (): Promise<Task[]> => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
