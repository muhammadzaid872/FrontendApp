import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { dashboardComponent } from './dashboard.component';

describe('DefaultComponent', () => {
  let component: dashboardComponent;
  let fixture: ComponentFixture<dashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
