# InvesNetwork Design System (Angular)

Implementación oficial del **Design System de InvesNetwork** para **Angular 17 / 18 / 19** utilizando componentes *Standalone* y TypeScript estricto.

## Contenido de la Biblioteca

- **`ds-button`**: Botones con variantes institucionales (`primary`, `accent`, `contrast`, `dark`, `outline`, `outline-accent`, `ghost`, `danger`, `success`), tamaños `sm`/`md`/`lg` y estados de carga.
- **`ds-badge`**: Etiquetas de estado y operacionales con variantes (`subtle`, `solid`, `outline`), puntos indicadores (`dot`) y estados operativos (`locked`, `awaiting`, `blocked`, `offline`).
- **`ds-card` & `ds-kpi-card`**: Tarjetas de contenido y KPIs financieros con cálculo de tendencias y subtítulos.
- **`ds-alert`**: Mensajes de notificación institucionales con slots para iconos y cierre opcional.
- **`ds-modal`**: Diálogos modales accesibles con backdrop blur y slots de cabecera, cuerpo y pie.
- **Form Controls (`ds-input`, `ds-select`, `ds-toggle`)**: Componentes de formulario totalmente compatibles con `ControlValueAccessor`, `ngModel` y `ReactiveFormsModule`.
- **Navigation (`ds-tabs`, `ds-breadcrumb`, `ds-pagination`)**: Pestañas en píldora o subrayado, migas de pan y paginador.
- **`inves-advisor-drawer`**: Asesor IA financiero en componente Standalone de Angular.

## Instalación en tu Proyecto Angular

1. Copia la carpeta `src/angular-design-system` en tu proyecto Angular (por ejemplo en `src/app/shared/design-system` o como librería en un monorepo `projects/inves-design-system`).
2. Importa los componentes standalone directamente en tus componentes de Angular:

```typescript
import { Component } from '@angular/core';
import { DsButtonComponent, DsBadgeComponent, DsKpiCardComponent } from './angular-design-system/public-api';

@Component({
  selector: 'app-investment-dashboard',
  standalone: true,
  imports: [DsButtonComponent, DsBadgeComponent, DsKpiCardComponent],
  template: `
    <ds-kpi-card
      label="TIR Media Anual"
      value="14.8%"
      change="+2.4%"
      trend="up"
      subtitle="Auditoría Big Four"
    ></ds-kpi-card>

    <ds-button variant="primary" size="md" (clicked)="onInvest()">
      Invertir en Oportunidad
    </ds-button>

    <ds-badge variant="locked" [dot]="true">Bloqueado</ds-badge>
  `,
})
export class InvestmentDashboardComponent {
  onInvest() {
    console.log('Inversión solicitada');
  }
}
```
