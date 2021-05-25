import AbstractModel from './abstract-model.js';

export default class Offers extends AbstractModel {
  constructor() {
    super();
    this._offers = [];
  }

  setItems(offers) {
    this._offers = offers.slice();
    //this._notify(updateType, this._offers);
  }

  getItems() {
    return this._offers;
  }
}
