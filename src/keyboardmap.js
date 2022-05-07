const winKey = `<span class="material-symbols-outlined">
keyboard_command_key
</span>`;
const ArrowLeft = `<span class="material-symbols-outlined">
arrow_back
</span>`;
const ArrowRight = `<span class="material-symbols-outlined">
arrow_forward
</span>`;
const ArrowDown = `<span class="material-symbols-outlined">arrow_downward
</span>`;
const ArrowUp = `<span class="material-symbols-outlined">
arrow_upward
</span>`;
/* TODO: поменять иконки шифтови ентер и бекспейс */
const keyboardMap = {
  line1: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace:Func:2:&#x2190;Backspace', 'Delete:Func:1:Del'],
  line2: ['Tab:Func:1.5:Tab&#x2194;', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash:key:1.5', 'None'],
  line3: ['CapsLock:Func:1.75:CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter:Func:2.25:Enter&#x21B5;', 'None'],
  line4: ['ShiftLeft:Func:2.25:&#x21D1;Shift', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight:Func:1.75:&#x21D1;Shift', `ArrowUp:Arrow:1:${ArrowUp}`, 'None'],
  line5: ['ControlLeft:Func:1.5:Ctrl', `MetaLeft:Func:1:${winKey}`, 'AltLeft:Func:1:Alt', 'Space:space:7.5', 'AltRight:Func:1:Alt', 'ControlRight:Func:1:Ctrl', `ArrowLeft:Arrow:1:${ArrowLeft}`, `ArrowDown:Arrow:1:${ArrowDown}`, `ArrowRight:Arrow:1:${ArrowRight}`],
};

export default keyboardMap;
