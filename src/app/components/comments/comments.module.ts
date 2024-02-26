import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

export const CommentRoutes: Routes = [
  {
    path: '',
    component: CommentsComponent
    
  },

];

@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild(CommentRoutes)
  ]
})
export class CommentsModule { }
