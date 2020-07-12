import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { OptionGroupComponent } from './option-group.component';

describe('OptionGroupComponent', () => {
  let spectator: Spectator<OptionGroupComponent>;
  const createComponent = createComponentFactory(OptionGroupComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
