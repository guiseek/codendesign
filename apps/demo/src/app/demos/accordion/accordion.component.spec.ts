import { MatDividerModule } from '@angular/material/divider';
import { CodeAccordionModule } from '@cnd/code/components';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AccordionComponent } from './accordion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

describe('AccordionComponent', () => {
  let spectator: Spectator<AccordionComponent>;
  const createComponent = createComponentFactory({
    component: AccordionComponent,
    imports: [
      CommonModule,
      MatButtonModule,
      MatDividerModule,
      CodeAccordionModule,
      RouterTestingModule,
    ],
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
