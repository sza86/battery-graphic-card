class BatteryGraphicCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    if (!this.content) {
      this.innerHTML = `
        <div class="card-config">
          <paper-input label="Encja (np. sensor.battery)" value="${config.entity || ""}" configKey="entity"></paper-input>
        </div>
      `;
      this.querySelectorAll("paper-input").forEach(el => {
        el.addEventListener("change", ev => {
          this._config[ev.target.configKey] = ev.target.value;
          this._updateConfig();
        });
      });
    }
  }

  _updateConfig() {
    const event = new Event("config-changed", { bubbles: true, composed: true });
    event.detail = { config: this._config };
    this.dispatchEvent(event);
  }

  get config() {
    return this._config;
  }
}

customElements.define("battery-graphic-card-editor", BatteryGraphicCardEditor);
