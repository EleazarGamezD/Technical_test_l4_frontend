import { TaskStatus } from '@/app/core/enums/task/task.enum';
import { ITask } from '@/app/core/interfaces/task/task.interface';
import { TaskService } from '@/app/core/services/task/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',

  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  currentPage = 1;
  pageSize = 5;
  searchTerm = '';
  statusFilter = 'All';
  taskStatus = Object.values(TaskStatus);

  constructor(private taskService: TaskService) {}

  async ngOnInit(): Promise<void> {
    const results = await this.taskService.getAll(1, 10);
    this.tasks = results.task;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(
      (task) =>
        (this.statusFilter === 'All' || task.status === this.statusFilter) &&
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onStatusFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  get pagedTasks(): ITask[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredTasks.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.pageSize);
  }
}
