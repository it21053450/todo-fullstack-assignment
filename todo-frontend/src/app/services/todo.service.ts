import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  
  private readonly apiBase = 'http://localhost:5292/api/tasks';

  // GET latest 5 incomplete tasks
  getLatest(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiBase);
  }

  // POST create new task
  create(task: { title: string; description: string }): Observable<Task> {
    return this.http.post<Task>(this.apiBase, task);
  }

  // PUT mark as done
  complete(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiBase}/${id}/done`, {});
  }
}
