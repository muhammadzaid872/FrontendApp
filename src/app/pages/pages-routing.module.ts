import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dashboardComponent } from './dashboard/dashboard.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
const routes: Routes = [
  { path: '', redirectTo: 'Dashboard' },
  { path: 'Dashboard', component: dashboardComponent },
  { path: 'LeaveManagement', component: LeaveManagementComponent,
     loadChildren: () => import('./leave-management/LeaveManagementModule').then(m => m.LeaveManagementModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
