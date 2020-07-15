import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { AccordionHeaderComponent } from './accordion-header.component';
import { AccordionComponent } from './accordion.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  createHostFactory,
  SpectatorHost,
} from '@ngneat/spectator';

import { AccordionPanelComponent } from './accordion-panel.component';
import { Component } from '@angular/core';
import { AccordionButtonDirective } from './accordion-button.directive';

let NEXT_ID = 0;

@Component({
  selector: 'cnd-custom-host',
  template: '',
})
class CustomHostComponent {
  panels = [
    {
      header: 'Lorem ipsum dolor sit',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est!',
    },
    {
      header: 'Lorem ipsum dolor sit',
      content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est!',
    },
  ];
}

const templates = {
  panel: `<cnd-accordion-panel *ngFor="let panel of panels">`,
  h2: `<h2 cnd-accordion-header>
    <button cnd-accordion-button>{{ panel.header }}</button>
  </h2>`,
  p: `<p>{{ panel.content }}</p>`,
};

describe('AccordionPanelComponent', () => {
  let spectator: SpectatorHost<AccordionPanelComponent, CustomHostComponent>;
  let template: string;
  const createHost = createHostFactory({
    component: AccordionPanelComponent,
    host: CustomHostComponent,
    declarations: [
      AccordionComponent,
      AccordionPanelComponent,
      AccordionHeaderComponent,
      AccordionButtonDirective,
    ],
    imports: [CommonModule, CdkAccordionModule, MatRippleModule],
  });

  beforeEach(() => {
    template = `
      <cnd-accordion>
        <cnd-accordion-panel>
        </cnd-accordion-panel>
      </cnd-accordion>
    `;
  });

  it('should create select', () => {
    spectator = createHost(template,
      {
        props: {
          expanded: false,
        },
      }
    );
    expect(spectator.query('.zippy__title')).toHaveText('Spectator is Awesome');
  });
  // it('should create select', () => {
  //   spectator = createHost(template);
  //   console.log(spectator);

  //   expect(spectator.component).toBeTruthy();
  // });
});
