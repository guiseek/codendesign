import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { TextFieldElementDirective } from './text-field-element.directive';

describe('TextFieldElementDirective ', () => {
  let spectator: SpectatorDirective<TextFieldElementDirective>;
  const createDirective = createDirectiveFactory(TextFieldElementDirective);

  it('should change the background color', () => {
    spectator = createDirective(
      `<div cndTextFieldElement>Testing TextFieldElementDirective</div>`
    );

    expect(spectator.directive.elementRef).toBeTruthy();
  });
});
