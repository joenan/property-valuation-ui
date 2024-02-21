import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PvcValidationRequestsComponent } from './pvc-validation-requests.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

export const PvcValidationRequestsRoutes: Routes = [
  {
    path: '',
    component: PvcValidationRequestsComponent
    
  },

];

@NgModule({
  declarations: [PvcValidationRequestsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PvcValidationRequestsRoutes)
  ]
})
export class PvcValidationRequestsModule { }
