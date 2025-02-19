import { TaskStatus } from '@/app/core/enums/task/task.enum';
import { ITask } from '@/app/core/interfaces/task/task.interface';
import { TaskService } from '@/app/core/services/task/task.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  taskForm: FormGroup;
  editMode = false;
  editTaskId: number | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatus],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: ITask = {
        id: this.editTaskId || 0,
        ...this.taskForm.value,
      };

      if (this.editMode) {
        this.taskService.update(task);
      } else {
        this.taskService.create(task);
      }

      this.resetForm();
    }
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'Pending',
    });
    this.editMode = false;
    this.editTaskId = null;
  }

  editTask(task: ITask): void {
    this.editMode = true;
    this.editTaskId = task.id as number;
    this.taskForm.patchValue(task);
  }
}
