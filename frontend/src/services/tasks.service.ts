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
  let responseStatus: Response["status"];
  return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response: Response) => {
      responseStatus = response.status;
      if (response.ok) {
        return;
      }
      return response.json();
    })
    .then((response) => {
      if (responseStatus === 404 || responseStatus === 409) {
        throw new Error(response.msg);
      }
      return "New task added";
    });
};

export const updateTask = async (task: Task): Promise<string> => {
  let responseStatus: Response["status"];
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response: Response) => {
      responseStatus = response.status;
      if (response.ok) {
        return;
      }
      return response.json();
    })
    .then((response) => {
      if (responseStatus === 404) {
        throw new Error(response.msg);
      }
      return "Task updated successfully";
    });
};

export const deleteTask = async (taskId: Task["id"]): Promise<string> => {
  let responseStatus: Response["status"];
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  })
    .then((response: Response) => {
      responseStatus = response.status;
      if (response.ok) {
        return;
      }
      return response.json();
    })
    .then((response) => {
      if (responseStatus === 404) {
        throw new Error(response.msg);
      }
      return "Task deleted";
    });
};

export const updateTaskOrder = async (task: Task[]): Promise<string> => {
  let responseStatus: Response["status"];
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response: Response) => {
      responseStatus = response.status;
      if (response.ok) {
        return;
      }
      return response.json();
    })
    .then((response) => {
      if (responseStatus === 404) {
        throw new Error(response.msg);
      }
      return "Task order updated";
    });
};
