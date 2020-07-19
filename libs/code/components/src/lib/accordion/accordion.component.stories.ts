import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { text, number, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/angular';
import { CodeAccordionModule } from './accordion.module';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cnd-container',
  template: '<ng-content></ng-content>',
  styles: [
    `
      @import 'https://fonts.googleapis.com/icon?family=Material+Icons';
    `,
  ],
})
class Container {
  @Input() panels = [];
}

const moduleMetadata = {
  declarations: [Container],
  imports: [BrowserAnimationsModule, CodeAccordionModule],
};
const panel = {
  expanded: true,
  header: 'Lorem ipsum dolor sit',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est!',
};

const template = `<cnd-container>
<cnd-accordion>
  <cnd-accordion-panel *ngFor="let panel of panels">
    <h2>
      <button cnd-accordion-button [disabled]="panel.disabled">{{ panel.header }}</button>
    </h2>
    <p>{{ panel.content }}</p>
  </cnd-accordion-panel>
</cnd-accordion>
</cnd-container>`;

storiesOf('Accordion', module)
  .addDecorator(withA11y)
  .add('Simple', () => {
    return {
      moduleMetadata,
      template,
      props: {
        panels: [panel],
      },
    };
  })
  .add('Multiple', () => ({
    moduleMetadata,
    template,
    props: {
      panels: [panel, panel],
    },
  }))
  .add('Disabled', () => ({
    moduleMetadata,
    template,
    props: {
      panels: [
        {
          ...panel,
          disabled: true,
        },
        panel,
      ],
    },
  }));
