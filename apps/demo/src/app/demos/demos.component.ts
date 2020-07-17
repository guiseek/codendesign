import { Component, OnInit } from '@angular/core';
import { children } from './route-children';

@Component({
  selector: 'cnd-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css'],
})
export class DemosComponent implements OnInit {
  links = children.map(({ path }) => path);
  constructor() {
    console.log(this.links);
  }
  ngOnInit(): void {}
}
