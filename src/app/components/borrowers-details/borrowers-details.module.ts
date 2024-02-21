import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BorrowersDetailsComponent } from './borrowers-details.component';

export const BorrowersDetailsRoutes: Routes = [
  {
    path: '',
    component: BorrowersDetailsComponent
    
  },

];



@NgModule({
  declarations: [BorrowersDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(BorrowersDetailsRoutes)
    
  ]
})
export class BorrowersDetailsModule { }
