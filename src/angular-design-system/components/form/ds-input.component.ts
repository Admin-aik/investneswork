import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputComponent),
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
        <!-- Prefix icon slot -->
        <div class="absolute left-3 text-[#6b7280] pointer-events-none flex items-center">
          <ng-content select="[slot=prefix]"></ng-content>
        </div>

        <input
          [id]="id"
          [type]="type"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          (input)="onInput($event)"
          (blur)="onTouched()"
          [ngClass]="[
            'w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl font-medium transition-all duration-200 outline-none',
            'bg-[var(--ds-surface-body)] text-[#0f2a43] border',
            error
              ? 'border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20'
              : 'border-[var(--ds-border-default)] focus:border-[#084c61] focus:ring-2 focus:ring-[#084c61]/15',
            hasPrefix ? 'pl-10' : '',
            hasSuffix ? 'pr-10' : '',
            disabled ? 'opacity-50 cursor-not-allowed bg-[var(--ds-surface-muted)]' : ''
          ]"
        />

        <!-- Suffix icon slot -->
        <div class="absolute right-3 text-[#6b7280] pointer-events-none flex items-center">
          <ng-content select="[slot=suffix]"></ng-content>
        </div>
      </div>

      <p *ngIf="error" class="text-xs text-[#dc2626] font-medium mt-0.5">
        {{ error }}
      </p>
      <p *ngIf="hint && !error" class="text-xs text-[#6b7280] mt-0.5">
        {{ hint }}
      </p>
    </div>
  `,
})
export class DsInputComponent implements ControlValueAccessor {
  @Input() id: string = `ds-input-${Math.random().toString(36).substring(2, 9)}`;
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() error?: string;
  @Input() hint?: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hasPrefix: boolean = false;
  @Input() hasSuffix: boolean = false;
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onChange = (_value: string) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
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

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
