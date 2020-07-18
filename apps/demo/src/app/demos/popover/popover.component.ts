import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  title = 'Popover title';
  constructor() { }

  ngOnInit(): void {
  }

}
