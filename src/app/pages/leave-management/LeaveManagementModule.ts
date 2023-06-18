import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LeaveManagementComponent } from './leave-management.component';
import { DataTablesModule } from 'angular-datatables';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';

@NgModule({
  declarations: [LeaveManagementComponent,ApplyLeaveComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule
    
  ]
  
})
export class LeaveManagementModule { }
