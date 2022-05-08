import Button from './btn';
import layouts from './layouts';
import keyboardMap from './keyboardmap';
import bodyTemplate from './templates';

export default class Keyboard {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('keyborad-container');
    this.btns = {};
    this.capsed = false;
    this.shifted = false;
    this.alted = false;
    this.lang = 'Eng';
    this.langs = ['Eng', 'Rus'];
    this.mousePressedCode = '';

    Object.keys(keyboardMap).forEach((key) => {
      const line = document.createElement('div');
      line.classList.add('line-container');
      line.classList.add(`keyboard-${key}`);
      keyboardMap[key].forEach((k) => {
        const btnKey = new Button(...k.split(':'));
        line.appendChild(btnKey.element);
        this.btns[btnKey.code] = btnKey;
      });
      this.element.appendChild(line);
    });

    document.body.innerHTML = bodyTemplate;
    this.textarea = document.querySelector('.form__input');

    document.querySelector('.components').appendChild(this.element);
    this.addEvents();
  }

  addEvents() {
    document.addEventListener('click', () => { this.textarea.focus(); });

    this.element.addEventListener('mousedown', (e) => {
      const key = e.target.closest('.btn');
      if (key) {
        this.mousePressedCode = key.id;
        this.activatekey(key.id);
      }
    });
    document.addEventListener('mouseup', (e) => {
      const key = e.target.closest('.btn');
      if (this.mousePressedCode.slice(0, 5) === 'Shift' && (!key || key.id !== this.mousePressedCode)) {
        this.shifted = true;
      } else if (this.mousePressedCode !== '') {
        this.deactivatekey(this.mousePressedCode);
        if (this.btns.ShiftLeft.isPressed) this.deactivatekey(this.btns.ShiftLeft.code);
        if (this.btns.ShiftRight.isPressed) this.deactivatekey(this.btns.ShiftRight.code);
        this.mousePressedCode = '';
      }
    });

    this.textarea.addEventListener('keydown', (e) => {
      this.activatekey(e.code);
      e.preventDefault();
    });
    this.textarea.addEventListener('keyup', (e) => {
      this.deactivatekey(e.code);
      e.preventDefault();
    });
  }

  switchLang() {
    this.lang = this.langs.pop();
    this.langs.unshift(this.lang);
    console.log(this.langs);
  }

  activatekey(code) {
    const btn = this.btns[code];
    if (btn) btn.element.classList.add('btn--active');
    if (code === 'CapsLock' && !btn.isPressed) {
      this.capsed = !this.capsed;
      btn.element.classList.toggle('capsed');
      btn.isPressed = true;
      this.initLang();
    } else if (code.slice(0, 5) === 'Shift' && !btn.isPressed) {
      this.shifted = !this.shifted;
      btn.isPressed = true;
      if (this.alted) { this.switchLang(); }
      this.initLang();
    } else if (code.slice(0, 3) === 'Alt' && !btn.isPressed) {
      this.alted = !this.alted;
      btn.isPressed = true;
      if (this.shifted) {
        this.switchLang();
        this.initLang();
      }
    } else if (code === 'Enter') {
      this.textarea.value += '\n';
    } else if (code === 'Tab') {
      this.textarea.value += '\t';
    } else if (code === 'Backspace' || code === 'Delete') {
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const { value } = this.textarea;
      if (end > start) {
        console.log(end, start);
        this.textarea.value = value.slice(0, start) + value.slice(end);
        this.textarea.selectionEnd = start;
      } else if (code === 'Backspace') {
        this.textarea.value = value.slice(0, start - 1) + value.slice(end);
        this.textarea.selectionEnd = start - 1;
      } else if (code === 'Delete') {
        this.textarea.value = value.slice(0, start) + value.slice(end + 1);
        this.textarea.selectionEnd = start;
      }
    } else if (btn.type === 'key' || btn.type === 'Arrow') {
      this.textarea.value += btn.label;
    }
  }

  deactivatekey(code) {
    const btn = this.btns[code];
    if (btn) btn.element.classList.remove('btn--active');
    if (code === 'CapsLock') {
      btn.isPressed = false;
    } else if (code.slice(0, 5) === 'Shift' && btn.isPressed) {
      this.shifted = !this.shifted;
      btn.isPressed = false;
      this.initLang();
    } else if (code.slice(0, 3) === 'Alt' && btn.isPressed) {
      this.alted = !this.alted;
      btn.isPressed = false;
    }
  }

  initLang() {
    const lay = layouts.find((l) => l.lang === this.lang && l.shifted === this.shifted).layout;
    console.log(this.shifted);
    const keys = Object.keys(this.btns);
    keys.filter((b) => this.btns[b].type === 'key').forEach((b) => {
      if (this.capsed && this.shifted && b.slice(0, 3) === 'Key') { this.btns[b].changeLabel(lay[b].toLowerCase()); } else if (this.capsed && !this.shifted && b.slice(0, 3) === 'Key') { this.btns[b].changeLabel(lay[b].toUpperCase()); } else this.btns[b].changeLabel(lay[b]);
    });
  }
}

const keyBoard = new Keyboard();
keyBoard.initLang();