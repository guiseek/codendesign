import { ɵrenderComponent, ɵdetectChanges } from '@angular/core';
import { App } from './app';
import { AppComponent } from './app.component';

/**
 * Wrapper para Custom Elements usando Ivy Componente Angular e Custom Elements
 * As APIS utilizadas aqui, farão parte do processo automático na próxima versão
 * do Angular Elements, segundo Manfred Steyer.
 */
export class AppInfoElement extends HTMLBodyElement {
  private comp: AppComponent;

  get info(): App {
    return this.comp.info;
  }
  set info(info: App) {
    console.log('info', info);
    this.comp.info = info;
    ɵdetectChanges(this.comp);
  }

  get active(): boolean {
    return this.comp.active;
  }
  set active(active: boolean) {
    this.comp.active = active;
    ɵdetectChanges(this.comp);
  }

  constructor() {

    super();

    this.comp = ɵrenderComponent(AppComponent, { host: this });

    // Ouvindo eventos do componente Angular e
    // transmitindo em eventos personalizados
    this.comp.activeChange.subscribe(e => {
      const { active, ...info } = this.info;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { active, ...info }
        })
      )
    });
  }

  static get observedAttributes() {
    return ['info', 'active'];
  }
}
