import { Component, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/core/models/dashboard.model';
import {  UserService } from 'src/app/core/services/user.service';
import { ResponseModel } from 'src/app/core/models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class dashboardComponent implements OnInit {
  cardsData: DashboardCard[] = []
  LoginUserId: number = 0;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.LoginUserId = Number(localStorage.getItem("loginUserId"));
    this.getCardData();
  }
  getCardData() {
    this.userService.getDashboardCards().subscribe(response => {
      if (response.status == 200) {
        let responseModel = response.body as ResponseModel;
        if (responseModel.success) {
          this.cardsData = responseModel.data;
        } else {
          this.toastr.error(responseModel.message);
        }
      }
    },
      (error) => {
        console.error('error caught in getCardData', error);
      });
  }
}
