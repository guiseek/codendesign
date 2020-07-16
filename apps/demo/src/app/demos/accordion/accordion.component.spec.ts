import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let spectator: Spectator<AccordionComponent>;
  const createComponent = createComponentFactory(AccordionComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
