import { TaskStatus } from '@/app/core/enums/task/task.enum';
import { ITask } from '@/app/core/interfaces/task/task.interface';
import { TaskService } from '@/app/core/services/task/task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  currentPage = 1;
  pageSize = 10;
  taskStatus = Object.values(TaskStatus);
  page = 1;
  limit = 10;
  totalTasks = 0;
  taskStatusColors = {
    [TaskStatus.PENDING]: 'bg-warning',
    [TaskStatus.IN_PROGRESS]: 'bg-primary',
    [TaskStatus.ON_HOLD]: 'bg-secondary',
    [TaskStatus.CANCELLED]: 'bg-danger',
    [TaskStatus.COMPLETED]: 'bg-success',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.getTask();
  }

  async getTask(): Promise<void> {
    const results = await this.taskService.getAll(this.page, this.limit);
    this.tasks = results.tasks;
    this.totalTasks = results.total;
    this.pageSize = Math.min(this.totalTasks, 10);
  }

  pagedTasks(): ITask[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.tasks.slice(startIndex, startIndex + this.pageSize) || [];
  }

  totalPages(): number {
    return Math.ceil(this.totalTasks / this.limit) || 1;
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.page = newPage;
      this.getTask();
    }
  }

  goToCreateTask(): void {
    this.router.navigate(['/create']);
  }

  editTask(task: ITask): void {
    this.router.navigate(['/edit', task.id]);
  }

  async deleteTask(task: ITask): Promise<void> {
    await this.taskService.delete(task.id).then(() => {
      this.getTask();
    });
  }
}
