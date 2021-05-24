import AbstractView from './abstract.js';
const EDIT_BUTTON_CLASS = 'event__rollup-btn';
const POINT_CLASS = 'trip-events__item';
const createPointsContainerElement = () => '<ul class="trip-events__list"></ul>';

export default class PointsContainer extends AbstractView {
  constructor() {
    super();
    this._pointClickHandler = this._pointClickHandler.bind(this);
  }

  getTemplate() {
    return createPointsContainerElement();
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().addEventListener('click', this._pointClickHandler);
  }

  removePointClickHandler() {
    this.getElement().removeEventListener('click', this._pointClickHandler);
  }

  _pointClickHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(EDIT_BUTTON_CLASS)) {
      return;
    }
    evt.preventDefault();
    const pointID = target.closest(`.${POINT_CLASS}`).dataset.id;
    this._callback.pointClick(pointID);
  }
}
