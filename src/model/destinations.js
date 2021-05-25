import AbstractModel from './abstract-model.js';

export default class Destinations extends AbstractModel {
  constructor() {
    super();
    this._destinations = [];
  }

  setItems(destinations) {
    this._destinations = destinations.slice();
    //this._notify(updateType, this._destinations);
  }

  getItems() {
    return this._destinations;
  }
}
