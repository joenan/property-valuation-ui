import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/api.service';
import { IComment } from '../model/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  private domain: string = environment.propertyUrl;
  private apiUrl = 'http://63.250.53.24:9095/file-uploads';
  constructor(private _apiService: ApiService,private http: HttpClient) {}


  public createComment( payload: IComment): Observable<IComment> {
    return this._apiService.add<any>(`${this.domain}comments`, payload);
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
  public retrieveComments(page: number, size: number): Observable<any[]> {
    return this._apiService.getPage<any[]>(
      `${this.domain}comments`,
      page,
      size
    );
  }

  public retrieveCommentByCommentNumber(
    comment_id: any
  ): Observable<any> {
    return this._apiService.getById<any>(
      `${this.domain}comments`,
      comment_id
    );
  }

  public updateCommentByCommentId(
    comment_id: any,
    payload: any
  ): Observable<any> {
    return this._apiService.updateById<any>(
      `${this.domain}comments`,
      comment_id,
      payload
    );
  }

  public partialUpdateCommentByCommentId(
    comment_id: any,
    payload: any
  ): Observable<any> {
    return this._apiService.partialUpdateById<any>(
      `${this.domain}comments`,
      comment_id,
      payload
    );
  }

  public deleteCommentByCommentId(comment_id: any): Observable<any> {
    return this._apiService.delete(`${this.domain}comments`, comment_id);
  }
}
