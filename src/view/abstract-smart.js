import Abstract from './abstract.js';

export default class AbstractSmart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateElement(disableHandlers = false) {
    const oldElement = this.getElement();
    const currentScroll = oldElement.scrollTop;
    const parent = oldElement.parentElement;

    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    newElement.scrollTop = currentScroll;
    if (disableHandlers) {
      return;
    }
    this.restoreHandlers();
  }

  updateState(update, {justUpdate = false, disableHandlers = false} = {}) {
    if (!update) {
      return;
    }
    this._state = {...this._state, ...update};

    if (justUpdate) {
      return;
    }
    this.updateElement(disableHandlers);
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
