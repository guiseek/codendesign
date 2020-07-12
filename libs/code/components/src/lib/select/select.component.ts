import { takeUntil } from 'rxjs/operators';
import { Field } from './../field/field';
import { OptionGroup } from './option-group/option-group.interface';
import { Option } from './option/option.interface';
import { OptionGroupComponent } from './option-group/option-group.component';
import { OptionComponent } from './option/option.component';
import {
  Component,
  OnInit,
  forwardRef,
  OnChanges,
  AfterContentInit,
  Input,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  SimpleChanges,
  Optional,
  Host,
  SkipSelf,
  OnDestroy,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ControlContainer,
} from '@angular/forms';
import { Subject } from 'rxjs';
/**
 * Select
 *
 * @export
 * @class SelectComponent
 * @implements {OnChanges}
 * @implements {AfterContentInit}
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'cnd-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends Field
  implements
    OnInit,
    OnChanges,
    AfterContentInit,
    OnDestroy,
    ControlValueAccessor {
  destroy$ = new Subject<void>();
  @ContentChildren(OptionComponent) public selectOptions: QueryList<
    OptionComponent
  >;
  @ContentChildren(OptionGroupComponent)
  public selectOptionGroups: QueryList<OptionGroupComponent>;

  /**
   * @param {valueChange} EventEmitter
   *
   * @memberof SelectComponent
   */
  @Output() public valueChange = new EventEmitter();
  public options: Option[];
  public optionsGroups: OptionGroup[];
  public selected: any;
  public disabled = false;
  public touched = false;
  private internalValue: Option;

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
  public onChange: any = (_) => {
    /*Empty*/
  };

  // tslint:disable-next-line: no-empty
  public onTouched: any = (_) => {};

  public onSelected($event) {
    this.selected = $event.value;
    this.onChange($event.value);
    this.valueChange.emit($event.value);
  }

  public ngOnChanges(change: SimpleChanges) {
    if (change.options) {
      if (change.options.isFirstChange()) {
        return;
      }
      if (change.options.currentValue !== change.options.previousValue) {
        this.selected = null; // Resetting the model to show placeholder
        this.onChange(null);
      }
    }
  }

  public ngAfterContentInit() {
    this.options = this.getOptions(this.selectOptions);
    this.optionsGroups = this.getOptionGroups(this.selectOptionGroups);

    this.selectOptionGroups.changes.subscribe(
      (optionGroups: QueryList<OptionGroupComponent>) =>
        (this.optionsGroups = this.getOptionGroups(optionGroups))
    );

    this.selectOptions.changes.subscribe(
      (options: QueryList<Option>) =>
        (this.options = options.length ? this.getOptions(options) : [])
    );
  }

  // CONTROL VALUE ACCESSOR

  public writeValue(value: any): void {
    this.internalValue = value;
    this.onChange(this.internalValue);
    this.valueChange.emit(value);
    this.selected = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    const self = this;
    this.onTouched = (arg: any) => {
      self.touched = true;
      fn(arg);
    };
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private getOptionGroups(list: QueryList<OptionGroupComponent>) {
    return list.length
      ? list.map((group) => ({
          label: group.label,
          options: this.getOptions(group.options),
        }))
      : [];
  }

  private getOptions(list: QueryList<OptionComponent>): Option[] {
    return list.length
      ? list.map((item: OptionComponent) => ({
          value: item.value,
          templateRef: item.templateRef,
        }))
      : [];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
