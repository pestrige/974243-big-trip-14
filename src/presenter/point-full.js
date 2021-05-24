import PointFullView from '../view/point-full.js';
import { remove, replace } from '../utils/render.js';

export default class PointFullPresenter {
  constructor(containerComponent) {
    this._container = containerComponent.getElement();
    this._component = null;
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(point, pointPresenter) {
    this._point = point;
    this._pointPresenter = pointPresenter;
    const oldComponent = this._component;

    this._component = new PointFullView(this._point);
    document.addEventListener('keydown', this._handleEscKeyDown);

    if (oldComponent === null) {
      replace(this._pointPresenter.getComponent(), this._component);
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
    replace(this._component, this._pointPresenter.getComponent());
    remove(this._component);
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.destroy();
    }
  }
}
