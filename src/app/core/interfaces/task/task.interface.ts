import { TaskStatus } from '../../enums/task/task.enum';

export interface ITask {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface ITaskPaginated {
  task: ITask[];
  total: number;
}
