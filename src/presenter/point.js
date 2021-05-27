import PointView from '../view/point.js';
import { render, remove, replace } from '../utils/render.js';
import { UpdateType, ActionType } from '../const.js';

export default class PointPresenter {
  constructor(container, handleViewAction) {
    this._container = container;
    this._component = null;
    this._handleViewAction = handleViewAction;
    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this);
  }

  init(point) {
    this._point = point;
    const oldComponent = this._component;
    this._component = new PointView(this._point);
    this._component.setFavoriteButtonClick(this._handleFavoriteButtonClick);

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

  _handleFavoriteButtonClick(isFavoriteFlag) {
    this._handleViewAction(ActionType.FAVORITE, UpdateType.PATCH, {...this._point, isFavorite: !isFavoriteFlag});
  }
}
