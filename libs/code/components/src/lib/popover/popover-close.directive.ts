import { PopoverRef } from './popover-ref';
import { Directive, Input, Optional, HostListener } from '@angular/core';

@Directive({
  selector: '[cndPopoverClose]'
})
export class PopoverCloseDirective<T = any> {
  @Input('cndPopoverClose') popoverResult: T;

  constructor(@Optional() private popoverRef: PopoverRef<T>) {}

  @HostListener('click') onClick(): void {
    console.log('close')
    if (!this.popoverRef) {
      console.error('cndPopoverClose is not supported within a template');
      return;
    }

    this.popoverRef.close(this.popoverResult);
  }
}
