import { Component, OnInit,EventEmitter,Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/app/core/models/response.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter<any>();

  leaveForm: FormGroup;
  formSubmited:boolean=false;
  constructor(private formBuilder: FormBuilder,
             private toastrService:ToastrService,
             private userService: UserService
             ) { }

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      leaveType: ['', Validators.required],
      natureOfLeave: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }
  submitForm() {
    if (this.leaveForm.invalid) {
      this.toastrService.error("Provide require data");
      return;
    }
    console.log(this.leaveForm.value);
    this. PostApplyLeave(this.leaveForm.value);
  }
  PostApplyLeave(data:any){
    this.userService.postApplyLeave(data).subscribe(response => {
      if (response.status == 200) {
        let responseModel = response.body as ResponseModel;
        if (responseModel.success) {
          this.toastrService.success(responseModel.message);
        } else {
          this.toastrService.error(responseModel.message);
        }
        this.triggerNotify();
      }
    },
      (error) => {
        console.error('error caught in PostApplyLeave', error);
      });
  }
  triggerNotify(): void {
    this.notifyParent.emit();
  }
}
