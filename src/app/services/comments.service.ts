import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class CommentsService {

  private baseUrl: string = environment.appUrl;

  private http = inject(HttpClient);

  createComments(comments: any): Observable<any> {
    return this.http.post(`${this.baseUrl}comments`, comments);
  }

  getCommentsById(commentsId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}comments/${commentsId}`);
  }

  getCommentsByPropertyId(propertyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}comments/propertyId/${propertyId}`);
  }


  deleteComments(commentsId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}comments/${commentsId}`);
  }

  getAllFacilities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments`);
  }
}
