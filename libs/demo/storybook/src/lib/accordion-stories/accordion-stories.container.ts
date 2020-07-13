import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cnd-storybook-accordion-stories',
  templateUrl: './accordion-stories.container.html',
  styleUrls: ['./accordion-stories.container.scss'],
})
export class AccordionStoriesContainer {
  @Input() multi = true;
  @Input() expanded: boolean;
  panels = [1, 2, 3];
}
