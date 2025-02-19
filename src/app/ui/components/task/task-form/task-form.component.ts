import { TaskStatus } from '@/app/core/enums/task/task.enum';
import {
  ITask,
  ITaskCreate,
  ITaskUpdate,
} from '@/app/core/interfaces/task/task.interface';
import { TaskService } from '@/app/core/services/task/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  editMode = false;
  editTaskId: number | null = null;
  taskStatus = Object.values(TaskStatus);
  minDate: string;
  taskStatusColors = {
    [TaskStatus.PENDING]: 'bg-warning',
    [TaskStatus.IN_PROGRESS]: 'bg-primary',
    [TaskStatus.ON_HOLD]: 'bg-secondary',
    [TaskStatus.CANCELLED]: 'bg-danger',
    [TaskStatus.COMPLETED]: 'bg-success',
  };

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatus],
      dueDate: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const taskId = params.get('id');
      if (taskId) {
        this.editMode = true;
        this.editTaskId = +taskId;
        this.getTask();
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: ITaskCreate | ITaskUpdate = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        dueDate: this.taskForm.value.dueDate,
      };
      const taskId = this.editTaskId as number;

      if (this.editMode) {
        this.taskService.update(taskId, task as ITaskUpdate);
      } else {
        console.log(task);
        this.taskService.create(task as ITaskCreate);
      }

      this.resetForm();
    }
  }

  async getTask(): Promise<void> {
    const task = await this.taskService.getById(this.editTaskId!.toString());
    this.taskForm.patchValue({
      ...task,
      dueDate: this.formatDate(task.dueDate.toString()),
    });
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: TaskStatus.PENDING,
    });
    this.editMode = false;
    this.editTaskId = null;
  }

  editTask(task: ITask): void {
    this.editMode = true;
    this.editTaskId = Number(task.id);
    this.taskForm.patchValue(task);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
