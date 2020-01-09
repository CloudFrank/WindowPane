export default class ScrollPane extends HTMLDivElement {
  constructor() {
    super();
    this.pane = this.getAttribute('class');
    this.attachShadow({mode: 'open'});
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = this.template();
  }
  
  template() {
    return `
      <div class='pane'>
        <slot></slot>
      </div>
      ${this.style()}
    `;
  }
  
  style() {
    return `
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          overflow: hidden;
        }
        .pane {
          grid-column: 1 / -1;
          grid-row: 1 / -1;
          overflow: auto;
        }
        ${this.styleWebkitScrollbar()}
        ${this.styleFirefoxScrollbar()}
      </style>
    `;
  }
  
  styleWebkitScrollbar() {
    return `
      .pane::-webkit-scrollbar {
        display: block;
        width: 6px;
        height: 6px;
      }
      .pane:hover::-webkit-scrollbar-track {
        background-color: #2222;
      }
      .pane:hover::-webkit-scrollbar-thumb {
        background-color: #e36b4e;
      }
      ${this.styleWebkitScrollbarX()}
      ${this.styleWebkitScrollbarY()}
      ${this.styleWebkitScrollbarXY()}
    `;
  }
  
  styleWebkitScrollbarX() {
    return (this.pane === 'top' || this.pane === 'bottom') ? `
      .pane {
        overflow-y: hidden;
      }
      .pane::-webkit-scrollbar-track,
      .pane::-webkit-scrollbar-thumb {
        background-color: #0000;
      }
    `: ``;
  }
  
  styleWebkitScrollbarY() {
    return (this.pane === 'left' || this.pane === 'right') ? `
      .pane {
        overflow-x: hidden;
        width: max-content;
      }
      ::slotted(:nth-child(1n+0)) {
        padding-right: 6px;
        border-bottom: 1px solid #f9f9f9;
      }
      .pane:hover::-webkit-scrollbar {
        display: block;
        width: 6px;
        height: 6px;
      }
      .pane::-webkit-scrollbar {
        display: none;
      }
    `: ``;
  }
  
  styleWebkitScrollbarXY() {
    return (this.pane === 'main') ? `
      .pane::-webkit-scrollbar-corner,
      .pane::-webkit-scrollbar-track {
        background-color: #0000;
      }
      .pane:hover::-webkit-scrollbar-corner {
        background-color: #2222;
      }
      .pane::-webkit-scrollbar-thumb {
        background-color: #e36b4e;
      }
    `: ``;
  }
  
  styleFirefoxScrollbar() {
    return `
      .pane {
        scrollbar-width: thin;
      }
      .pane:hover {
        scrollbar-color: #e36b4e #2222;
      }
      ${this.styleFirefoxScrollbarY()}
      ${this.styleFirefoxScrollbarXY()}
      ${this.styleFirefoxScrollbarX()}
    `;
  }
  
  styleFirefoxScrollbarX() {
    return (this.pane === 'top' || this.pane === 'bottom') ? `
      .pane {
        scrollbar-color: #0000 #0000;
      }
    `: ``;
  }
  
  styleFirefoxScrollbarY() {
    return (this.pane === 'left' || this.pane === 'right') ? `
      .pane:hover {
        scrollbar-width: thin;
      }
      .pane {
        scrollbar-width: none;
      }
    `: ``;
  }
  
  styleFirefoxScrollbarXY() {
    return (this.pane === 'main') ? `
      .pane {
        scrollbar-color: #e36b4e #0000;
      }
    `: ``;
  }
  
};

//customElements.define('scroll-pane', ScrollPane, { extends: "div"});
