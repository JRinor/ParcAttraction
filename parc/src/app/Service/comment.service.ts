import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:5000/comments';

  constructor(private http: HttpClient) {}

  addComment(commentData: any, first_name?: string, last_name?: string): Observable<any> {
    const data = { ...commentData, first_name, last_name };
    return this.http.post(this.apiUrl, data);
  }

  getComments(attractionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/attraction/${attractionId}`);
  }
}
