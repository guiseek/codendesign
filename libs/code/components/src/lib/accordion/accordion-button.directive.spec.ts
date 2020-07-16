import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { AccordionButtonDirective } from './accordion-button.directive';


describe('AccordionButtonDirective ', () => {
  let spectator: SpectatorDirective<AccordionButtonDirective>;
  const createDirective = createDirectiveFactory(AccordionButtonDirective);

  it('should change the background color', () => {
    spectator = createDirective(`<div cnd-accordion-button>Testing AccordionButtonDirective</div>`);
    spectator.dispatchMouseEvent(spectator.element, 'click');
    expect(spectator.directive.expanded).toBe(true);
  });
  it('should change the background color', () => {
    spectator = createDirective(`<div cnd-accordion-button>Testing AccordionButtonDirective</div>`);
    spectator.dispatchMouseEvent(spectator.element, 'click');
    spectator.dispatchMouseEvent(spectator.element, 'click');
    expect(spectator.directive.expanded).toBe(false);

  });

});
