import { CodeAccordionModule } from '@cnd/code/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionStoriesContainer } from './accordion-stories/accordion-stories.container';
import { DemoStorybookShell } from './storybook.shell';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CodeAccordionModule
  ],
  declarations: [
    AccordionStoriesContainer,
    DemoStorybookShell,
    TableComponent
  ],
  exports: [
    DemoStorybookShell
  ]
})
export class DemoStorybookModule {}
