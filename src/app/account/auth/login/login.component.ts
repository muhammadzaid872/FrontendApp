import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formValue() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.login(this.formValue.email.value,this.formValue.password.value).subscribe(response => {
          if (response.success) {
            this.toastr.success(response.message);
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            localStorage.setItem('loginFullName',response.data.name);
            this.router.navigate(['/Dashboard']);
            window.location.href='/Dashboard'
          } else {
            this.toastr.error(response.message);
          }
      },
        (error) => {
          console.error('error caught in login', error);
        });
    }
  }
}
