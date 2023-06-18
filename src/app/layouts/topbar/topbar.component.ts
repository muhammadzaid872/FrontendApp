import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService) {
  }
  loginUserName:string='';

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  ngOnInit() {
    this.loginUserName=localStorage.getItem('loginFullName');
    this.element = document.documentElement;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }
}
