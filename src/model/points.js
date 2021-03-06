import AbstractModel from './abstract-model.js';

export default class Points extends AbstractModel {
  constructor() {
    super();
    this._points = [];
  }

  setItems(updateType, points) {
    this._points = points.slice();
    this._notify(updateType, this._points);
  }

  getItems() {
    return this._points;
  }

  addPoint(updateType, newPoint) {
    this._points = [...this._points, newPoint];
    this._notify(updateType, newPoint);
  }

  updatePoint(updateType, update) {
    this._points = [...this._points];
    const index = this._points.findIndex((point) => point.id === update.id);
    if (index !== -1) {
      this._points.splice(index, 1, update);
    }
    if (updateType) {
      this._notify(updateType, update);
    }
  }

  deletePoint(updateType, id) {
    this._points = [...this._points];
    const index = this._points.findIndex((point) => point.id === id);
    this._points.splice(index, 1);
    this._notify(updateType);
  }
}
