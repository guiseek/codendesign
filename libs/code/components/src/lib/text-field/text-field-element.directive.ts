import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[cndTextFieldElement]',
})
export class TextFieldElementDirective {
  constructor(public elementRef: ElementRef<HTMLTextAreaElement>) {}
}
