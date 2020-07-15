import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { AccordionButtonDirective } from './accordion-button.directive';

describe('AccordionButtonDirective ', () => {
  let spectator: SpectatorDirective<AccordionButtonDirective>;
  const createDirective = createDirectiveFactory(AccordionButtonDirective);

  it('should change the background color', () => {
    spectator = createDirective(`<div highlight>Testing AccordionButtonDirective</div>`);

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

});
