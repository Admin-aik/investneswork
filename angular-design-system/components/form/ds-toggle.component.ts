import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsToggleComponent),
      multi: true,
    },
  ],
  template: `
    <label class="inline-flex items-center gap-3 cursor-pointer select-none">
      <div class="relative">
        <input
          type="checkbox"
          class="sr-only"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onToggle($event)"
        />
        <div
          [ngClass]="[
            'w-11 h-6 rounded-full transition-colors duration-200 ease-in-out',
            checked ? 'bg-[#084c61]' : 'bg-[#d1d5db]',
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          ]"
        ></div>
        <div
          [ngClass]="[
            'absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          ]"
        ></div>
      </div>
      <span *ngIf="label" class="text-xs sm:text-sm font-semibold text-[#0f2a43]">
        {{ label }}
      </span>
    </label>
  `,
})
export class DsToggleComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange = (_checked: boolean) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.checked = !!value;
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

  onToggle(event: Event): void {
    if (this.disabled) return;
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }
}
