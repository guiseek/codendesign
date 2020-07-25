import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/angular';
import { text, number, boolean } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeStepperModule } from './stepper.module';
import { CodeStepperComponent } from './stepper.component';

const template = `
  <cnd-stepper [controls]="controls">
    <cnd-step>
      <p>Step 1</p>
      <button type="button" cndStepperNext>Próximo</button>
    </cnd-step>
    <cnd-step>
      <p>Step 2</p>
      <button type="button" cndStepperPrevious>Anterior</button>
      <button type="button" cndStepperNext>Próximo</button>
    </cnd-step>
    <cnd-step>
      <p>Step 3</p>
      <button type="button" cndStepperPrevious>Anterior</button>
      <button cndStepperNext>Concluir</button>
    </cnd-step>
  </cnd-stepper>
`;
const moduleMetadata = {
  imports: [CodeStepperModule],
};
storiesOf('Stepper', module)
  .addDecorator(withA11y)
  .add('Simple', () => {
    return {
      moduleMetadata,
      template,
      component: CodeStepperComponent,
      props: {
        controls: boolean('Controles', false)
      },
    };
  });

