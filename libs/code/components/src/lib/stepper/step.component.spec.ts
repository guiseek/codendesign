import { CodeStepperComponent } from './stepper.component';
import { CodeStepComponent } from './step.component';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';


describe('CodeStepComponent', () => {
  let spectator: SpectatorHost<CodeStepComponent, CodeStepperComponent>;
  let template: string;
  const createHost = createHostFactory({
    component: CodeStepComponent,
    host: CodeStepperComponent
  });

  beforeEach(() => {
    template = `
    <cnd-step>
      <p>Step 1</p>
      <button type="button" cndStepperPrevious>Anterior</button>
      <button type="button" cndStepperNext>Próximo</button>
    </cnd-step>
    `;
  });

  it('should create select', () => {
    spectator = createHost(template);
    expect(spectator.component).toBeTruthy();
  });
});
