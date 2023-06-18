import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private eventService: EventService) { }
  ngOnInit() {
  }
}
