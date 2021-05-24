//import AbstractSmartPresenter from './abstract-smart.js';
import PointView from '../view/point.js';
import { render, remove, replace } from '../utils/render.js';

export default class PointPresenter {
  constructor(container) {
    //super();
    this._container = container;
    this._component = null;
    // методы _changeData и _handleControlButtons
    // наследуются от AbstractSmartPresenter
    //this._changeData = handleFilmChange;
    //this._handleControlButtons = this._handleControlButtons.bind(this);
  }

  init(point) {
    this._point = point;
    const oldComponent = this._component;

    this._component = new PointView(this._point);
    //this._component.setControlButtonsClick(this._handleControlButtons);

    if (oldComponent === null) {
      render(this._container, this._component);
      return;
    }

    replace(oldComponent, this._component);
    remove(oldComponent);
  }

  getPoint() {
    return this._point;
  }

  getComponent() {
    return this._component;
  }

  destroy() {
    remove(this._component);
  }
}
