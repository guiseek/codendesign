import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { CodeStepperNext } from './stepper-button.directive';

describe('CodeStepperNext ', () => {
  let spectator: SpectatorDirective<CodeStepperNext>;
  const createDirective = createDirectiveFactory(CodeStepperNext);

  it('should change the background color', () => {
    spectator = createDirective(`<div highlight>Testing CodeStepperNext</div>`);

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
