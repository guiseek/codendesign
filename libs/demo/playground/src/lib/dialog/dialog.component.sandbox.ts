import { sandboxOf } from 'angular-playground';
import { DialogComponent } from './dialog.component';

export default sandboxOf(DialogComponent)
  .add('default', {
    template: `<cnd-dialog></cnd-dialog>`
  });
