import { takeUntil } from 'rxjs/operators';
import {
  Component,
  OnInit,
  Input,
  Host,
  OnDestroy,
  EventEmitter,
  Output,
  Optional,
  SkipSelf,
  ContentChild,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { Field } from './../field/field';
import { TextFieldElementDirective } from './text-field-element.directive';

@Component({
  selector: 'cnd-text-field',
  exportAs: 'cndTextField',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true,
    },
  ],
})
export class TextFieldComponent extends Field implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  @ViewChild(TextFieldElementDirective) textFieldElement: TextFieldElementDirective;

  public set minRows(value: number) {
    this._minRows = value;
  }
  public get minRows(): number {
    return this._minRows;
  }
  private _minRows = 1;

  public set maxRows(value: number) {
    this._maxRows = value;
  }
  public get maxRows(): number {
    return this._maxRows;
  }
  private _maxRows = 5;

  @Input()
  public set type(value: string) {
    this._type = value;
  }
  public get type(): string {
    return this._type;
  }
  private _type = 'text';

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {
    super();
  }

  ngOnInit() {
    if (this.formControl) {
      return this.detectChanges();
    }
    if (this.controlContainer) {
      if (this.formControlName) {
        this.setControl(this.controlContainer);
      } else {
        console.warn(
          `Missing FormControl/Name directive on ${this.formControlName} field`
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  setControl({ control }: ControlContainer) {
    this.formControl = control.get(this.formControlName);
    this.detectChanges();
  }
  detectChanges() {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.valueChange);
  }
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
