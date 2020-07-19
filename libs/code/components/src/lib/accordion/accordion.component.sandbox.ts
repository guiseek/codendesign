import { sandboxOf } from 'angular-playground';
import { AccordionComponent } from './accordion.component';

export default sandboxOf(AccordionComponent)
  .add('default', {
    template: `<cnd-accordion></cnd-accordion>`
  });
