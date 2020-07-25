import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { StepperComponent } from './stepper.component';
import { CodeStepperModule } from '@cnd/code/components';

// @Component({ template: '' })
// class CustomHostComponent {
//   title = 'Custom HostComponent';
// }

describe('StepperComponent', () => {
  // let host: SpectatorHost<StepperComponent, CustomHostComponent>;
  let spectator: Spectator<StepperComponent>;
  const createComponent = createComponentFactory({
    component: StepperComponent,
    imports: [
      CodeStepperModule
    ]
  });
  // const createHost = createHostFactory({
  //   component: StepperComponent,
  //   host: CustomHostComponent
  // });
  beforeEach(() => spectator = createComponent());
  it('should display the host component title', () => {
    // host = createHost(`<zippy [title]="title"></zippy>`);
    expect(spectator.component).toBeTruthy();
  });
});
