export default class WindowPane extends HTMLDivElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = this.template();
  }
  
  template() {
    return `
      <slot></slot>
      <style>
        ${this.styleHost()}
        ${this.stylePane()}
      </style>
    `;
  }
  
  styleHost() {
    return `
      :host {
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-template-rows: max-content 1fr max-content;
        background-color: #0000;
        overflow: hidden;
      }
      :host(.viewport) {
        width: 100vw;
        height: 100vh;
      }
    `;
  }
  
  stylePane() {
    return `
      ::slotted(.left) {
        grid-column: 1 / 2;
        grid-row: 1 / -1;
      }
      ::slotted(.right) {
        grid-column: -2 / -1;
        grid-row: 1 / -1;
      }
      ::slotted(.top) {
        grid-column: 1 / -1;
        grid-row: 1 / 2;
      }
      ::slotted(.bottom) {
        grid-column: 1 / -1;
        grid-row: -1 / -2;
      }
      ::slotted(.main) {
        grid-column: 2 / -2;
        grid-row: 2 / -2;
      }
      ::slotted(.middle) {
        grid-column: 1 / -1;
        grid-row: 2 / -2;
      }
      ::slotted(.center) {
        grid-column: 2 / -2;
        grid-row: 1 / -1;
      }
    `;
  }
  
};

//customElements.define('window-pane', WindowPane, { extends: "div"});
