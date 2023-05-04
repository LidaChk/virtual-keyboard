import { notFuncKeys, manipulatingKeys } from '../keyboardmap';

class Keyboard {
  constructor() {
    // TODO: определение капслока
    // TODO: определение языка

    this.lsCurrentKeys = 'cybervapor-vkb-currentKeys';
    this.lsLang = 'cybervapor-vkb-lang';

    this.currentKeys = new Set();
    this.needToRelease = new Set();
    this.lang = this.getLangFromLocalStorage() || 'Eng';
    this.langs = ['Eng', 'Rus'];
    this.altKey = false;
    this.ctrlKey = false;
    this.shiftKey = false;
    this.capsKey = false;
    this.shifted = false;

    this.notFuncKeys = new Set(notFuncKeys);
    this.manipulatingKeys = new Set(manipulatingKeys);

    this.#updateLocalStorage();
  }

  pressKey(key) {
    switch (key) {
      case 'CapsLock':
        if (this.currentKeys.has('CapsLock')) this.needToRelease.add('CapsLock');
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        if (this.shiftKey) {
          this.needToRelease.add('ShiftLeft');
          this.needToRelease.add('ShiftRight');
        }
        break;
      case 'AltLeft':
      case 'AltRight':
        if (this.altKey) {
          this.needToRelease.add('AltLeft');
          this.needToRelease.add('AltRight');
        }
        break;
      case 'ControlLeft':
      case 'ControlRight':
        if (this.ctrlKey) {
          this.needToRelease.add('ControlLeft');
          this.needToRelease.add('ControlRight');
        }
        break;
      default:
    }
    this.currentKeys.add(key);
    this.updateModifierState();
  }

  releaseKey(key, src) {
    switch (key) {
      case 'CapsLock':
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'AltLeft':
      case 'AltRight':
        if (this.isShifhtAltCombo()) {
          this.currentKeys.delete('AltLeft');
          this.currentKeys.delete('AltRight');
          this.currentKeys.delete('ShiftLeft');
          this.currentKeys.delete('ShiftRight');
        } else if (this.isShiftKeyCombo()) {
          this.currentKeys.delete('ShiftLeft');
          this.currentKeys.delete('ShiftRight');
        } else if (this.isAltKeyCombo()) {
          this.currentKeys.delete('AltLeft');
          this.currentKeys.delete('AltRight');
        }
        break;
      case 'ControlLeft':
      case 'ControlRight':
        if (this.isCtrlKeyCombo()) {
          this.currentKeys.delete('ControlLeft');
          this.currentKeys.delete('ControlRight');
        }
        break;
      default:
        this.currentKeys.delete(key);
    }

    // если сработало какой то комбо -
    // очистились все зажатые клавижи для сработавшего комбо в свитче выше
    // если комбо не сработало, а клавиша вызвана с клавиатуры
    // - чистим ее и проверяем оставшиеся нажатые клавиши
    if (src === 'physKey' && key !== 'CapsLock') {
      this.currentKeys.delete(key);
      this.needToRelease.delete(key);
      if (key.endsWith('Left')) {
        this.currentKeys.delete(key.replace('Left', 'Right'));
        this.needToRelease.delete(key.replace('Left', 'Right'));
      }
      if (key.endsWith('Right')) {
        this.currentKeys.delete(key.replace('Right', 'Left'));
        this.needToRelease.delete(key.replace('Right', 'Left'));
      }
    }
    [...this.needToRelease].forEach((keyId) => {
      this.currentKeys.delete(keyId);
      this.needToRelease.delete(keyId);
    });
    this.updateModifierState();
  }

  updateModifierState() {
    this.shiftKey = (this.currentKeys.has('ShiftLeft') || this.currentKeys.has('ShiftRight'));
    this.ctrlKey = (this.currentKeys.has('ControlLeft') || this.currentKeys.has('ControlRight'));
    this.altKey = (this.currentKeys.has('AltLeft') || this.currentKeys.has('AltRight'));
    this.capsKey = (this.currentKeys.has('CapsLock'));
    this.shifted = (this.capsKey || this.shiftKey) && !(this.capsKey && this.shiftKey);
  }

  isShiftKeyCombo() {
    const hasKey = [...this.currentKeys].some((k) => k.startsWith('Key'));
    return hasKey && (this.currentKeys.has('ShiftLeft') || this.currentKeys.has('ShiftRight'));
  }

  isCtrlKeyCombo() {
    const hasKey = [...this.currentKeys].some((k) => k.startsWith('Key'));
    return hasKey && (this.currentKeys.has('ControlLeft') || this.currentKeys.has('ControlRight'));
  }

  isAltKeyCombo() {
    const hasKey = [...this.currentKeys].some((k) => k.startsWith('Key'));
    return hasKey && (this.currentKeys.has('AltLeft') || this.currentKeys.has('AltRight'));
  }

  isShifhtAltCombo() {
    return (this.currentKeys.has('ShiftLeft') || this.currentKeys.has('ShiftRight'))
      && (this.currentKeys.has('AltLeft') || this.currentKeys.has('AltRight'));
  }

  switchLang() {
    this.lang = this.langs.at((this.langs.findIndex((lang) => lang === this.lang) || 0) - 1);
    this.#updateLocalStorage();
  }

  getLangFromLocalStorage() {
    return localStorage.getItem(this.lsLang);
  }

  #updateLocalStorage() {
    localStorage.setItem(this.lsLang, this.lang);
  }

  isShifted() {
    return this.currentKeys.has('ShiftLeft') || this.currentKeys.has('ShiftRight');
  }

  checkStackedKeys() {
    [...this.currentKeys].forEach((key) => {
      if (this.manipulatingKeys.has(key)) this.currentKeys.delete(key);
      if (this.notFuncKeys.has(key)) this.currentKeys.delete(key);
      if (key.includes('Meta')) this.currentKeys.delete(key);
    });
  }
}

export default Keyboard;
