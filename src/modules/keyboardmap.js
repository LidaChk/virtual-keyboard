const winKey = `<span class="material-symbols-outlined">
keyboard_command_key
</span>`;
const ArrowLeft = '◄';
const ArrowRight = '►';
const ArrowUp = '▲';
const ArrowDown = '▼';
const Shift = '&#8679; Shift';
const Enter = 'Enter&#8239;<big>&#8629;</big>';

const keyboardMap = {
  line1: ['Backquote:key', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace:Func:2:<big>⟵</big>&#8239;Backspace', 'Delete:Func:1:Del'],
  line2: ['Tab:Func:1.5:Tab&#8239;<big>&#11120;</big>', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash:key:1.5'], // , 'letters:letters::Aa'],
  line3: ['CapsLock:Func:1.75:CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', `Enter:Func:2.25:${Enter}`], // , 'poopies:poopies::9'],
  line4: [`ShiftLeft:Func:2.25:${Shift}`, 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma:key', 'Period:key', 'Slash:key', `ShiftRight:Func:1.75:${Shift}`, `ArrowUp:Arrow:1:${ArrowUp}`, 'fake:fake::'],
  line5: ['ControlLeft:Func:1.5:Ctrl', `MetaLeft:Func:1:${winKey}`, 'AltLeft:Func:1:Alt', 'Space:Space:7.5:', 'AltRight:Func:1:Alt', 'ControlRight:Func:1:Ctrl', `ArrowLeft:Arrow:1:${ArrowLeft}`, `ArrowDown:Arrow:1:${ArrowDown}`, `ArrowRight:Arrow:1:${ArrowRight}`],
};

export const notFuncKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
  'Minus', 'Equal', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
  'BracketLeft', 'BracketRight', 'Backslash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ',
  'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
export const manipulatingKeys = ['Space', 'Tab', 'Backspace', 'Delete', 'Enter'];

export default keyboardMap;
