import KeyboardController from './controller/keyboardController';
import TextareaController from './controller/textareaController';

const keyboardController = new KeyboardController();
const textareaController = new TextareaController();

keyboardController.init();
keyboardController.addEvents();

textareaController.init();
textareaController.addEvents();
