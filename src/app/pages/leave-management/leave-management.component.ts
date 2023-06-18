import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LeaveHistory } from 'src/app/core/models/leave.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {
  leaveHistory:LeaveHistory[]=[];

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  this.GetLeavesRecords();
  }
  ApplyForLeave(content: any) {
    this.modalService.open(content, { centered: true });
  }
  GetLeavesRecords(){
    this.userService.getLeavesRecords().subscribe(response => {
      if (response.status == 200) {
        let responseModel = response.body as ResponseModel;
        if (responseModel.success) {
          this.leaveHistory=responseModel.data;
          console.log("response-leave history",responseModel.data);
        } else {
          this.toastr.error(responseModel.message);
        }
      }
    },
      (error) => {
        console.error('error caught in getCardData', error);
      });
  }
  onNotify(): void {
    this.modalService.dismissAll();
    this.GetLeavesRecords();
  }
}
