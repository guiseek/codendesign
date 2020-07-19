import { text, number, boolean } from '@storybook/addon-knobs';
import { CodeAccordionModule } from './accordion.module';
import { AccordionComponent } from './accordion.component';

export default {
  title: 'Accordion'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      CodeAccordionModule
    ]
  },
  component: AccordionComponent,
  props: {
    multi: boolean('multi', true),
  }
})

export const expanded = () => ({
  moduleMetadata: {
    imports: [
      CodeAccordionModule
    ]
  },
  component: AccordionComponent,
  props: {
    expanded: boolean('expanded', true),
  }
})
