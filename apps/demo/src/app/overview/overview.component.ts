import { DocsService } from './../shared/docs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'cnd-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  constructor(public docs: DocsService) {}
}
