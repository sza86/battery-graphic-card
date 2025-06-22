import { LitElement, html } from 'lit';
import { fireEvent } from 'https://cdn.jsdelivr.net/npm/lovelace-card-tools@1.0.0/fire-event.js';

class BatteryGraphicCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  get _entity() {
    return this._config.entity || '';
  }

  render() {
    return html`
      <ha-form
        .data=${this._config}
        .schema=${[
          {
            name: 'entity',
            selector: { entity: { domain: 'sensor' } },
          },
        ]}
        @value-changed=${ev => {
          ev.stopPropagation();
          this._config = ev.detail.value;
          fireEvent(this, 'config-changed', { config: this._config });
        }}
      ></ha-form>
    `;
  }
}

customElements.define('battery-graphic-card-editor', BatteryGraphicCardEditor);
