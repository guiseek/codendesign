import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
  let spectator: Spectator<OptionComponent>;
  const createComponent = createComponentFactory(OptionComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
