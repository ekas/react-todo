import { Task } from "../models/task";

export const getAllTasks = async (): Promise<Task[]> => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const addNewTask = async (task: Task): Promise<string> => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.statusText;
  });
};

export const updateTask = async (task: Task): Promise<string> => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.statusText;
  });
};

export const deleteTask = async (taskId: Task["id"]): Promise<string> => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.statusText;
  });
};

export const updateTaskOrder = async (task: Task[]): Promise<string> => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.statusText;
  });
};
