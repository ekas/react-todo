import { Task } from "./task";

export interface TaskColumn {
  [key: string]: {
    name: string;
    type: "todo" | "inprogress" | "completed";
    tasks: Task[];
  };
}
