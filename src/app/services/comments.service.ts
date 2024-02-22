import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  private domain: string = environment.propertyUrl;
  constructor(private _apiService: ApiService) {}

  public createComment(payload: any): Observable<any> {
    return this._apiService.add<any>(`${this.domain}comments`, payload);
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
