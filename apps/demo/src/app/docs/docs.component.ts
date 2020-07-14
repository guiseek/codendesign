import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';

declare var ng: any;

@Component({
  selector: 'cnd-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class DocsComponent implements OnInit {
  ngOnInit() {}

  constructor(private router: Router, private route: ActivatedRoute) {
  }
}
