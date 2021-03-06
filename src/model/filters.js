import AbstractModel from './abstract-model.js';
import { FilterType, UpdateType } from '../const.js';

export default class Filters extends AbstractModel {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filterType) {
    this._activeFilter = filterType;
    this._notify(updateType, this._activeFilter);
  }

  setDefault({notifyOnly = false, setDisabled = false} = {}) {
    if (!notifyOnly) {
      this._activeFilter = FilterType.ALL;
    }
    this._notify(UpdateType.MAJOR, this._activeFilter, setDisabled);
  }

  getFilter() {
    return this._activeFilter;
  }

  isDefault() {
    return this._activeFilter === FilterType.ALL;
  }
}
