import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IPost {
  title: string;
  body: string;
  id: number;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAPIs(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url);
  }

  addAPI(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.url, post);
  }

  updateAPI(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.url}/${post.id}`, post);
  }

  deleteAPI(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${postId}`);
  }
}