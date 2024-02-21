import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDetailsComponent } from './facility-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


export const FacilityDetailsRoutes: Routes = [
  {
    path: '',
    component: FacilityDetailsComponent
    
  },

];

@NgModule({
  declarations: [FacilityDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FacilityDetailsRoutes)
  ]
})
export class FacilityDetailsModule { }
