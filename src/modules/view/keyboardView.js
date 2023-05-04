import keyboardMap from '../keyboardmap';
import Button from './buttonView';
import bodyTemplate from '../model/templates';
import layouts from '../layouts';

class KeyboardView {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('keyborad-container');
    this.btns = {};
    this.element.dataset.lang = '';
    this.element.dataset.shifted = '';

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

    document.querySelector('.form').after(this.element);
  }

  init() {
    this.state = 'initialized';
  }

  syncLangShift(lang, shiftKey, capsKey) {
    if (this.element.dataset.lang !== lang || this.element.dataset.shiftKey !== shiftKey.toString()
      || this.element.dataset.capsKey !== capsKey.toString()) {
      this.element.dataset.shifted = shiftKey.toString();
      this.element.dataset.capsKey = capsKey.toString();
      this.element.dataset.lang = lang;
      const layKeys = layouts.find(
        (l) => l.lang === lang && l.shifted === shiftKey,
      ).layout;
      const keys = Object.keys(this.btns);
      keys
        .filter((b) => this.btns[b].type === 'key')
        .forEach((b) => {
          if (capsKey && shiftKey && b.slice(0, 3) === 'Key') {
            this.btns[b].changeLabel(layKeys[b].toLowerCase());
          } else if (capsKey && !shiftKey && b.slice(0, 3) === 'Key') {
            this.btns[b].changeLabel(layKeys[b].toUpperCase());
          } else this.btns[b].changeLabel(layKeys[b]);
        });
    }
  }

  activateBtns(curBtns) {
    curBtns.forEach((keyId) => {
      this.btns[keyId]?.addClass('btn--active');
    });
  }

  deactivateBtns(curBtns) {
    Object.keys(this.btns)?.forEach((key) => {
      if (!curBtns.has(key)) this.btns[key].removeClass('btn--active');
    });
  }
}

export default KeyboardView;
