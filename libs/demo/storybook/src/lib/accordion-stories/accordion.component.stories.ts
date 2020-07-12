import { DemoStorybookModule } from './../demo-storybook.module';
import { text, number, boolean } from '@storybook/addon-knobs';
import { AccordionStoriesContainer } from './accordion-stories.container';

export default {
  title: 'Accordion'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      DemoStorybookModule
    ]
  },
  component: AccordionStoriesContainer,
  props: {
    multi: boolean('multi', true),
  }
})

export const expanded = () => ({
  moduleMetadata: {
    imports: [
      DemoStorybookModule
    ]
  },
  component: AccordionStoriesContainer,
  props: {
    expanded: boolean('expanded', true),
  }
})
