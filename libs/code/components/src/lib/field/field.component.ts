import { takeUntil } from 'rxjs/operators';
import {
  Component,
  OnInit,
  Input,
  Inject,
  Host,
  OnDestroy,
  EventEmitter,
  Output,
  Optional,
  SkipSelf,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { Field } from './field';

@Component({
  selector: 'cnd-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FieldComponent,
      multi: true,
    },
  ],
})
export class FieldComponent extends Field implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

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
