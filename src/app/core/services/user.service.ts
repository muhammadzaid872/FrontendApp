import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveHistory } from '../models/leave.model';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
        getDashboardCards() {
            return this.http.get(environment.backEndAPI + `/Leave/Dashboard`, {
                observe: "response"
            });
        }
        getLeavesRecords() {
            return this.http.get(environment.backEndAPI + `/Leave/GetAll`, {
                observe: "response"
            });
        }
        postApplyLeave(post:any) {
            return this.http.post(environment.backEndAPI + `/Leave/ApplyLeave`,post, {
                observe: "response"
            });
        }

}
