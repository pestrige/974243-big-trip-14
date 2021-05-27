import AbstractView from './abstract.js';

const createNewPointButtonElement = () => {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
};

export default class NewPointButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createNewPointButtonElement();
  }

  setClickHandler(callback) {
    this._callback.clickHandler = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  setDisabled() {
    this.getElement().disabled = true;
  }

  removeClickHandler() {
    this.getElement().removeEventListener('click', this._clickHandler);
  }

  removeDisabled() {
    this.getElement().disabled = false;
  }

  _clickHandler(evt) {
    if(evt.target !== this.getElement()) {
      return;
    }
    this._callback.clickHandler();
  }
}
