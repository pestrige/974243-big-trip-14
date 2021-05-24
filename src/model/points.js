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

  updatePoint(updateType, update) {
    this._points = [...this._points];
    //const updatedPoint = update.id ? this._adaptPointToClient(update) : update;
    const index = this._points.findIndex((point) => point.id === update.id);
    if (index !== -1) {
      this._points.splice(index, 1, update);
    }
    if (updateType) {
      this._notify(updateType, update);
    }
  }
}
