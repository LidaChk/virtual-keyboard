export default class Button {
  constructor(code, type = 'key', width = 1, label = '') {
    this.element = document.createElement('div');
    this.element.classList.add('btn');
    this.element.classList.add(`btn--${type}`);
    if (code === 'letters') this.element.classList.add('btn--magic');
    this.element.id = code;
    this.element.innerHTML = label;
    if (width > 1) this.element.style.flexGrow = width;

    this.code = code;
    this.key = label;
    this.label = label;
    this.type = type;
    this.isPressed = false;
  }

  changeLabel(newLabel) {
    this.element.innerHTML = newLabel;
    this.label = newLabel;
  }
}