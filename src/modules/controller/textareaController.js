import TextareaView from '../view/textareaView';

class TextareaController {
  constructor() {
    this.view = new TextareaView();
  }

  init() {
    this.view.addToKeyboard();
  }

  addEvents() {
    this.view.element.addEventListener('virtualKeyboardEvent', (e) => {
      if (e.detail.isKey) {
        this.view.updateValueWithKey(e.detail.key, e.detail.shifted, e.detail.lang, e.detail.value);
      }
      if (e.detail.isMnpKey) {
        this.view.updateValueWithMnpKey(e.detail.key);
      }
    });
  }
}

export default TextareaController;
