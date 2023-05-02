class VkbEvent {
  constructor(
    altKey = false,
    ctrlKey = false,
    metaKey = false,
    shiftKey = false,
    shifted = false,
    key = '',
    lang = 'Eng',
    isKey = false,
    isMnpKey = false,
    value = '',
  ) {
    this.customEvent = new CustomEvent('virtualKeyboardEvent', {
      detail: {
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        shifted,
        key,
        lang,
        isKey,
        isMnpKey,
        value,
      },
      bubbles: false,
      cancelable: true,
      composed: false,
    });
  }
}

export default VkbEvent;
