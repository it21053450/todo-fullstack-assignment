import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalDatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);

  title = 'Todo App';
  tasks: Task[] = [];

  newTitle = '';
  newDescription = '';

  loading = false;
  error = '';

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = '';

    this.todoService.getLatest().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load tasks';
        this.loading = false;
      },
    });
  }

  addTask() {
    if (!this.newTitle.trim() || !this.newDescription.trim()) {
      return;
    }

    const payload = {
      title: this.newTitle.trim(),
      description: this.newDescription.trim(),
    };

    this.todoService.create(payload).subscribe({
      next: () => {
        this.newTitle = '';
        this.newDescription = '';
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create task';
      },
    });
  }

  markDone(task: Task) {
    this.todoService.complete(task.id).subscribe({
      next: () => {
        // remove from list in UI
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to mark task as done';
      },
    });
  }
}
