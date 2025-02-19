import { Injectable } from '@angular/core';
import { GlobalHttpService } from '../globalHttp/global-http.service';
import { API_TASK_ROUTES } from '../../api-routes/task/task.routes';
import { RequestMethod } from '../../enums/httpRequest/requestMethods.enum';
import {
  ITask,
  ITaskCreate,
  ITaskPaginated,
  ITaskUpdate,
} from '../../interfaces/task/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends GlobalHttpService {
  async create(payload: ITaskCreate): Promise<ITask> {
    return await this.makeRequest<ITask, ITaskCreate>(
      API_TASK_ROUTES.CREATE_TASK,
      payload,
      RequestMethod.POST
    );
  }

  async getAll(page: number, limit: number): Promise<ITaskPaginated> {
    return await this.makeHttpRequest<ITaskPaginated>(
      `${API_TASK_ROUTES.GET_ALL_TASKS}?page=${page}&limit=${limit}`,
      {},
      RequestMethod.GET
    );
  }

  async getById(id: string): Promise<ITask> {
    return await this.makeHttpRequest<ITask>(
      `${API_TASK_ROUTES.GET_TASK_BY_ID}/${id}`,
      {},
      RequestMethod.GET
    );
  }

  async update(taskId: number, data: ITaskUpdate): Promise<ITask> {
    return await this.makeRequest<ITask, ITaskUpdate>(
      `${API_TASK_ROUTES.UPDATE_TASK}/${taskId}`,
      data,
      RequestMethod.PATCH
    );
  }

  async delete(id: number): Promise<void> {
    return await this.makeHttpRequest<void>(
      `${API_TASK_ROUTES.DELETE_TASK}/${id}`,
      {},
      RequestMethod.DELETE
    );
  }
}
