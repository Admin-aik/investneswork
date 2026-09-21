import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsButtonComponent } from '../button/ds-button.component';
import { DsBadgeComponent } from '../badge/ds-badge.component';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'inves-advisor-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, DsButtonComponent, DsBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Overlay & Drawer Container -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity"
      (click)="closeDrawer()"
    >
      <div
        class="fixed inset-y-0 right-0 max-w-full flex pl-10"
        (click)="$event.stopPropagation()"
      >
        <aside class="w-screen max-w-md bg-[var(--ds-surface-body)] border-l border-[var(--ds-border-default)] shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          <!-- Drawer Header -->
          <div class="p-6 border-b border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)] flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-[#084c61] text-[#c9a050] flex items-center justify-center font-bold text-lg shadow-sm">
                IN
              </div>
              <div>
                <h3 class="text-base font-extrabold text-[#0f2a43] flex items-center gap-2">
                  <span>{{ language === 'en' ? 'InvesAdvisor' : 'Asesor InvesNetwork' }}</span>
                  <ds-badge variant="accent" format="solid" size="sm">IA</ds-badge>
                </h3>
                <p class="text-xs text-[#6b7280]">
                  {{ language === 'en' ? 'Institutional Real Estate Copilot' : 'Copiloto de Inversión Inmobiliaria' }}
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="closeDrawer()"
              class="text-[#6b7280] hover:text-[#0f2a43] p-2 rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Cerrar asesor"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Message History -->
          <div class="flex-1 p-6 overflow-y-auto space-y-4">
            <div
              *ngFor="let msg of messages"
              class="flex flex-col"
              [ngClass]="msg.sender === 'user' ? 'items-end' : 'items-start'"
            >
              <div
                class="max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed"
                [ngClass]="
                  msg.sender === 'user'
                    ? 'bg-[#084c61] text-white shadow-sm'
                    : 'bg-[var(--ds-surface-muted)] text-[#0f2a43] border border-[var(--ds-border-default)]'
                "
              >
                {{ msg.text }}
              </div>
              <span class="text-[10px] text-[#6b7280] mt-1 px-1">{{ msg.timestamp }}</span>
            </div>

            <div *ngIf="isThinking" class="flex items-center gap-2 text-xs text-[#084c61] font-semibold p-2">
              <span class="animate-spin">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </span>
              <span>{{ language === 'en' ? 'Evaluating financial metrics...' : 'Analizando métricas financieras...' }}</span>
            </div>
          </div>

          <!-- Quick Prompts -->
          <div class="p-3 border-t border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)]/40 flex gap-2 overflow-x-auto">
            <button
              *ngFor="let prompt of suggestedPrompts"
              (click)="sendSuggested(prompt)"
              class="whitespace-nowrap px-3 py-1.5 text-xs rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-surface-body)] text-[#084c61] font-semibold hover:border-[#084c61] transition-colors"
            >
              {{ prompt }}
            </button>
          </div>

          <!-- Message Input -->
          <div class="p-4 border-t border-[var(--ds-border-default)] bg-[var(--ds-surface-body)] flex items-center gap-2">
            <input
              type="text"
              [(ngModel)]="inputText"
              (keyup.enter)="sendMessage()"
              [placeholder]="language === 'en' ? 'Ask about IRR, LTV, projects...' : 'Pregunta sobre TIR, LTV o proyectos...'"
              class="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[var(--ds-surface-muted)] border border-[var(--ds-border-default)] rounded-xl outline-none focus:border-[#084c61] text-[#0f2a43]"
            />
            <ds-button
              variant="primary"
              size="md"
              [disabled]="!inputText.trim() || isThinking"
              (clicked)="sendMessage()"
            >
              {{ language === 'en' ? 'Send' : 'Enviar' }}
            </ds-button>
          </div>

        </aside>
      </div>
    </div>
  `,
})
export class AdvisorDrawerComponent {
  @Input() isOpen: boolean = false;
  @Input() language: 'es' | 'en' = 'es';
  @Output() close = new EventEmitter<void>();

  inputText: string = '';
  isThinking: boolean = false;

  messages: ChatMessage[] = [
    {
      id: '1',
      sender: 'ai',
      text: 'Hola. Soy el asesor financiero de InvesNetwork. ¿Deseas analizar la rentabilidad neta o el balance de diversificación de tu cartera inmobiliaria?',
      timestamp: '12:00',
    },
  ];

  suggestedPrompts: string[] = [
    '¿Cuál es la TIR media?',
    '¿Cómo funciona el ticket mínimo?',
    'Comparar riesgo y plazo',
  ];

  closeDrawer(): void {
    this.close.emit();
  }

  sendMessage(): void {
    if (!this.inputText.trim() || this.isThinking) return;

    const userText = this.inputText.trim();
    this.messages.push({
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    this.inputText = '';
    this.isThinking = true;

    // Simulate backend response
    setTimeout(() => {
      this.isThinking = false;
      this.messages.push({
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Respecto a "${userText}": Las oportunidades en InvesNetwork presentan una TIR estimada entre el 12.8% y el 15.4% anual con garantías hipotecarias y auditoría Big Four.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 1000);
  }

  sendSuggested(prompt: string): void {
    this.inputText = prompt;
    this.sendMessage();
  }
}
