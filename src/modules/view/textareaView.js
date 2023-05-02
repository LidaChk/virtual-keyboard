export default class Textarea {
  constructor() {
    this.cols = 80;
    this.rows = 4;
    const textarea = document.createElement('textarea');
    textarea.classList.add('form__input');
    textarea.setAttribute('rows', this.rows);
    textarea.setAttribute('cols', this.cols);
    textarea.setAttribute('placeholder', 'Type anything...');
    textarea.setAttribute('autofocus', 'true');
    textarea.setAttribute('tabindex', '-1');
    textarea.setAttribute('spellcheck', 'false');

    this.element = textarea;
    document.querySelector('.form').appendChild(this.element);
  }

  addToKeyboard() {
    document.querySelector('.form').appendChild(this.element);
  }

  updateValueWithKey(key, shifted, lang, keyValue) {
    this.element.focus();
    const { value } = this.element;
    const start = this.element.selectionStart;
    const end = this.element.selectionEnd;
    this.element.value = `${value.slice(0, start)}${keyValue}${value.slice(end)}`;
    this.element.selectionEnd = start + keyValue.length;
  }

  updateValueWithMnpKey(key) {
    this.element.focus();

    const { value } = this.element;
    const start = this.element.selectionStart;
    const end = this.element.selectionEnd;

    switch (key) {
      case 'Space':
        this.element.value = `${value.slice(0, start)} ${value.slice(
          end,
        )}`;
        this.element.selectionEnd = start + 1;
        break;
      case 'Tab':
        this.element.value = `${value.slice(0, start)}\t${value.slice(
          end,
        )}`;
        this.element.selectionEnd = start + 1;
        break;
      case 'Backspace':
      case 'Delete':
        if (end > start) {
          this.element.value = `${value.slice(0, start)}${value.slice(end)}`;
          this.element.selectionEnd = start;
        } else if (key === 'Backspace') {
          const len = value.codePointAt(end - 1) > 55000 ? 2 : 1;
          this.element.value = `${value.slice(0, start - len)}${value.slice(end)}`;
          this.element.selectionEnd = start - len;
        } else if (key === 'Delete') {
          const len = value.codePointAt(end) > 55000 ? 2 : 1;
          this.element.value = `${value.slice(0, start)}${value.slice(end + len)}`;
          this.element.selectionEnd = start;
        }
        break;
      case 'Enter':
        this.element.value = `${value.slice(0, start)}\n${value.slice(
          end,
        )}`;
        this.element.selectionEnd = start + 1;

        break;
      default:
    }
  }

  getCurrentRow() {
    const end = this.element.selectionEnd;
    return this.element.value.slice(0, end).split('\n').redusce((s, acc) => (acc + (s === '' ? 0 : Math.floor(s.length / this.cols))));
  }

  getMaxRow() {
    return this.element.split('\n').redusce((s, acc) => (acc + (s === '' ? 0 : Math.floor(s.length / this.cols))));
  }
}

/**
      <textarea autofocus type="text" class="form__input" placeholder="Type anything..."
        tabindex="-1"></textarea> * */
