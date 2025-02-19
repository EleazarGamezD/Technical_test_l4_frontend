import { TaskStatus } from '../../enums/task/task.enum';

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
}

export interface ITaskPaginated {
  tasks: ITask[];
  total: number;
}

export interface ITaskCreate {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: Date;
}

export type ITaskUpdate = ITaskCreate & {
  id: number;
};
