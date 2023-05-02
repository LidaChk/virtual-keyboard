import Keyboard from '../model/keyboard';
import KeyboardView from '../view/keyboardView';
import { notFuncKeys, manipulatingKeys } from '../keyboardmap';
import VkbEvent from '../model/vkbEvent';

class KeyboardController {
  constructor() {
    this.model = new Keyboard();
    this.view = new KeyboardView();
    this.notFuncKeys = new Set(notFuncKeys);
    this.manipulatingKeys = new Set(manipulatingKeys);
  }

  init() {
    this.view.syncLangShift(this.model.lang, this.model.shifted);
  }

  handleKeyPress(keyId, isKey, isMnpKey) {
    this.model.pressKey(keyId);
    if (isKey || isMnpKey) {
      this.sendEventToTextarea(keyId, isKey, isMnpKey);
    }
    this.view.activateBtns(this.model.currentKeys);
    this.view.syncLangShift(this.model.lang, this.model.shifted);
  }

  handleKeyRelease(keyId, src) {
    if (this.model.isShifhtAltCombo()) {
      this.switchLang();
    }
    this.model.releaseKey(keyId, src);

    this.view.deactivateBtns(this.model.currentKeys);
    this.view.syncLangShift(this.model.lang, this.model.shifted);
  }

  addEvents() {
    const keyboard = this.view.element;
    keyboard.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        const key = e.target.closest('.btn');
        if (key) {
          this.handleKeyPress(
            key.id,
            this.notFuncKeys.has(key.id),
            this.manipulatingKeys.has(key.id),
          );
        }
        e.preventDefault();
      }
    });

    keyboard.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        const key = e.target.closest('.btn');
        if (key) {
          this.handleKeyRelease(key.id, 'mouse');
          e.preventDefault();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code.includes('Numpad')) {
        e.preventDefault();
      } else {
        this.handleKeyPress(
          e.code,
          this.notFuncKeys.has(e.code),
          this.manipulatingKeys.has(e.code),
        );
        e.preventDefault();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code.includes('Numpad')) {
        e.preventDefault();
      } else {
        this.handleKeyRelease(e.code, 'physKey');
        e.preventDefault();
      }
    });
    document.querySelector('.link--switchlang').addEventListener('click', () => {
      this.switchLang();
    });
    keyboard.addEventListener('contextmenu', (e) => {
      const key = e.target.closest('.btn');
      if (key && key.id.includes('Shift')) {
        this.switchLang();
        // e.preventDefault();
      }
    });
  }

  switchLang() {
    this.model.switchLang();
    this.view.syncLangShift(this.model.lang, this.model.shifted);
  }

  sendEventToTextarea(keyId, isKey, isMnpKey) {
    if (!this.textarea) this.textarea = document.querySelector('textarea.form__input');
    const vkbEvent = new VkbEvent(
      this.model.altKey,
      this.model.ctrlKey,
      false,
      this.model.shiftKey,
      this.model.shifted,
      keyId,
      this.model.lang,
      isKey,
      isMnpKey,
    );

    this.textarea.dispatchEvent(vkbEvent.customEvent);
    // vkbEvent = null;
  }
}

export default KeyboardController;
