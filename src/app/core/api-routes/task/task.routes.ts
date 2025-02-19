import { environment } from '@/environment/environment';

export const API_TASK_ROUTES = {
  GET_ALL_TASKS: `${environment.url}/tasks/all`,
  GET_TASK_BY_ID: `${environment.url}/tasks/get`,
  CREATE_TASK: `${environment.url}/tasks/create`,
  UPDATE_TASK: `${environment.url}/tasks/update`,
  DELETE_TASK: `${environment.url}/tasks/delete`,
};
