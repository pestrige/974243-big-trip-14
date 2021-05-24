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

  // updatePoint(updateType, update) {
  //   this._films = [...this._films];
  //   const updatedFilm = update.id ? this._adaptFilmToClient(update) : update;
  //   const index = this._films.findIndex((film) => film.filmInfo.id === updatedFilm.filmInfo.id);
  //   if (index !== -1) {
  //     this._films.splice(index, 1, updatedFilm);
  //   }
  //   if (updateType) {
  //     this._notify(updateType, updatedFilm);
  //   }
  // }
}
