import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface DsSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full flex flex-col gap-1.5">
      <label *ngIf="label" [for]="id" class="text-xs font-bold uppercase tracking-wider text-[#38563c]">
        {{ label }}
        <span *ngIf="required" class="text-[#dc2626] ml-0.5">*</span>
      </label>

      <div class="relative flex items-center">
        <select
          [id]="id"
          [value]="value"
          [disabled]="disabled"
          (change)="onChangeSelect($event)"
          (blur)="onTouched()"
          [ngClass]="[
            'w-full appearance-none px-3.5 py-2.5 pr-10 text-xs sm:text-sm rounded-xl font-medium transition-all duration-200 outline-none cursor-pointer',
            'bg-[var(--ds-surface-body)] text-[#0f2a43] border',
            error
              ? 'border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20'
              : 'border-[var(--ds-border-default)] focus:border-[#084c61] focus:ring-2 focus:ring-[#084c61]/15',
            disabled ? 'opacity-50 cursor-not-allowed bg-[var(--ds-surface-muted)]' : ''
          ]"
        >
          <option *ngIf="placeholder" value="" disabled selected>{{ placeholder }}</option>
          <option
            *ngFor="let opt of options"
            [value]="opt.value"
            [disabled]="opt.disabled"
          >
            {{ opt.label }}
          </option>
        </select>

        <div class="absolute right-3.5 pointer-events-none text-[#6b7280]">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <p *ngIf="error" class="text-xs text-[#dc2626] font-medium mt-0.5">
        {{ error }}
      </p>
    </div>
  `,
})
export class DsSelectComponent implements ControlValueAccessor {
  @Input() id: string = `ds-select-${Math.random().toString(36).substring(2, 9)}`;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() options: DsSelectOption[] = [];
  @Input() error?: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: any = '';

  @Output() valueChange = new EventEmitter<any>();

  onChange = (_value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
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

  onChangeSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
