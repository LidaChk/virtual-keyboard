import Button from './btn';
import layouts from './layouts';
import keyboardMap from './keyboardmap';
import bodyTemplate from './templates';

export default class Keyboard {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('keyborad-container');
    this.mode = 'letters';
    this.btns = {};
    this.capsed = false;
    this.shifted = false;
    this.alted = false;
    if (localStorage.getItem('rosely-vkb-lang') === null) { localStorage.setItem('rosely-vkb-lang', 'Eng'); }
    this.lang = localStorage.getItem('rosely-vkb-lang');
    this.langs = this.lang === 'Eng' ? ['Eng', 'Rus'] : ['Rus', 'Eng'];

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

    document.body.innerHTML = bodyTemplate.container;
    this.textarea = document.querySelector('.form__input');

    document.querySelector('.form').after(this.element);

    this.addEvents();
  }

  addEvents() {
    this.element.addEventListener('mousedown', (e) => {
      const key = e.target.closest('.btn');
      if (key) {
        this.mousePressedCode = key.id;
        this.activatekey(key.id);
      }
      e.preventDefault();
    });
    this.element.addEventListener('mouseup', (e) => {
      const key = e.target.closest('.btn');
      if (
        this.mousePressedCode.slice(0, 5) === 'Shift'
        && (!key || key.id !== this.mousePressedCode)
      ) {
        this.shifted = true;
      } else if (this.mousePressedCode !== '') {
        this.deactivatekey(this.mousePressedCode);
        if (this.btns.ShiftLeft.isPressed) { this.deactivatekey(this.btns.ShiftLeft.code); }
        if (this.btns.ShiftRight.isPressed) { this.deactivatekey(this.btns.ShiftRight.code); }
        this.mousePressedCode = '';
      }
      e.preventDefault();
    });

    document.addEventListener('keydown', (e) => {
      if (this.activatekey(e.code)) e.preventDefault();
      else if (e.code.slice(0, 6) === 'Numpad') {
        e.preventDefault();
      }
    });
    document.addEventListener('keyup', (e) => {
      if (this.deactivatekey(e.code)) e.preventDefault();
      else if (e.code.slice(0, 6) === 'Numpad') {
        e.preventDefault();
      }
    });
    document.querySelector('.link--switchlang').addEventListener('click', () => {
      this.switchLang();
      this.initLang();
    });
    this.element.addEventListener('contextmenu', (e) => {
      const key = e.target.closest('.btn');
      if (key && key.id.slice(0, 5) === 'Shift') {
        this.activatekey(key.id);
        e.preventDefault();
      }
    });
  }

  switchLang() {
    this.lang = this.langs.pop();
    this.langs.unshift(this.lang);
    localStorage.setItem('rosely-vkb-lang', this.lang);
  }

  activatekey(code) {
    const btn = this.btns[code];
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const { value } = this.textarea;
    if (!btn) return false;

    btn.element.classList.add('btn--active');
    if (code === 'CapsLock' && !btn.isPressed) {
      this.capsed = !this.capsed;
      btn.element.classList.toggle('capsed');
      btn.isPressed = true;
      this.initLang();
    } else if (code.slice(0, 5) === 'Shift' && !btn.isPressed) {
      this.shifted = !this.shifted;
      btn.isPressed = true;
      if (this.alted) {
        this.switchLang();
      }
      this.initLang();
    } else if (code.slice(0, 3) === 'Alt' && !btn.isPressed) {
      this.alted = !this.alted;
      btn.isPressed = true;
      if (this.shifted) {
        this.switchLang();
        this.initLang();
      }
    } else if (code === 'Enter') {
      this.textareafocus();
      this.textarea.value = `${value.slice(0, start)}\n${value.slice(end)}`;
      this.textarea.selectionEnd = start + 1;
    } else if (code === 'Tab') {
      this.textareafocus();
      this.textarea.value = `${value.slice(0, start)}\t${value.slice(end)}`;
      this.textarea.selectionEnd = start + 1;
    } else if (code === 'Backspace' || code === 'Delete') {
      this.textareafocus();
      if (end > start) {
        this.textarea.value = `${value.slice(0, start)}${value.slice(end)}`;
        this.textarea.selectionEnd = start;
      } else if (code === 'Backspace') {
        this.textarea.value = `${value.slice(0, start - 1)}${value.slice(end)}`;
        this.textarea.selectionEnd = start - 1;
      } else if (code === 'Delete') {
        this.textarea.value = `${value.slice(0, start)}${value.slice(end + 1)}`;
        this.textarea.selectionEnd = start;
      }
    } else if (btn.type === 'Space') {
      this.textareafocus();
      this.textarea.value = `${value.slice(0, start)} ${value.slice(end)}`;
      this.textarea.selectionEnd = start + 1;
    } else if (btn.type === 'key' || btn.type === 'Arrow') {
      this.textareafocus();
      this.textarea.value = `${value.slice(0, start)}${btn.label}${value.slice(
        end,
      )}`;
      this.textarea.selectionEnd = start + 1;
    } else if (
      btn.type === 'kitty'
      || btn.type === 'poopies'
      || btn.type === 'letters'
    ) {
      if (btn.type !== this.mode) this.toggleMode(btn.type);
    }
    return true;
  }

  textareafocus() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
      this.textarea.focus();
    }
  }

  deactivatekey(code) {
    const btn = this.btns[code];
    if (!btn) return false;
    if (btn) btn.element.classList.remove('btn--active');
    if (code.slice(0, 5) === 'Shift') {
      this.btns[code === 'ShiftLeft' ? 'ShiftRight' : 'ShiftLeft'].element.classList.remove('btn--active');
    }
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
    return true;
  }

  initLang() {
    const lay = layouts.find(
      (l) => l.lang === this.lang && l.shifted === this.shifted,
    ).layout;
    const keys = Object.keys(this.btns);
    keys
      .filter((b) => this.btns[b].type === 'key')
      .forEach((b) => {
        if (this.capsed && this.shifted && b.slice(0, 3) === 'Key') {
          this.btns[b].changeLabel(lay[b].toLowerCase());
        } else if (this.capsed && !this.shifted && b.slice(0, 3) === 'Key') {
          this.btns[b].changeLabel(lay[b].toUpperCase());
        } else this.btns[b].changeLabel(lay[b]);
      });
  }

  toggleMode(mode) {
    this.textarea.classList.remove('poopies');
    this.textarea.classList.remove('kitty');
    if (mode !== 'letters') this.textarea.classList.add(mode);

    const keys = Object.keys(this.btns);
    keys
      .filter((b) => this.btns[b].type === 'key')
      .forEach((b) => {
        this.btns[b].element.classList.remove('poopies');
        this.btns[b].element.classList.remove('kitty');
        if (mode !== 'letters') this.btns[b].element.classList.add(mode);
      });
    this.btns.letters.element.classList.remove('btn--magic');
    this.btns.kitty.element.classList.remove('btn--magic');
    this.btns.poopies.element.classList.remove('btn--magic');
    this.btns[mode].element.classList.add('btn--magic');
    this.mode = mode;
  }
}

const keyBoard = new Keyboard();
keyBoard.initLang();
