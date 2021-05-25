import PointFullView from '../view/point-full.js';
import { remove, replace } from '../utils/render.js';

export default class PointFullPresenter {
  constructor(containerComponent, destinationsModel, offersModel) {
    this._container = containerComponent.getElement();
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._component = null;
    this._callback = {};
    this.setEscKeydownHandler = this.setEscKeydownHandler.bind(this);
    this._handleEscKeydown = this._handleEscKeydown.bind(this);
  }

  init(point, pointPresenter) {
    this._render(
      point,
      pointPresenter,
      this._destinationsModel.getItems(),
      this._offersModel.getItems(),
    );
  }

  getPoint() {
    return this._point;
  }

  getComponent() {
    return this._component;
  }

  destroy() {
    this._component.removeDatePickers();
    replace(this._component, this._pointPresenter.getComponent());
    remove(this._component);
    document.removeEventListener('keydown', this._handleEscKeydown);
  }

  _render(point, pointPresenter, destinations, offers) {
    this._point = point;
    this._pointPresenter = pointPresenter;
    const oldComponent = this._component;

    this._component = new PointFullView(this._point, destinations, offers);
    //document.addEventListener('keydown', this._handleEscKeydown);

    if (oldComponent === null) {
      replace(this._pointPresenter.getComponent(), this._component);
      return;
    }

    replace(oldComponent, this._component);
    remove(oldComponent);
  }

  setEscKeydownHandler(callback) {
    this._callback.escKeydownHandler = callback;
    document.addEventListener('keydown', this._handleEscKeydown);
  }

  _handleEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._callback.escKeydownHandler();
    }
  }
}
