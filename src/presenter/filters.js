import FiltersView from '../view/filters.js';
import { getFilteredPointsCounts } from '../utils/dates.js';
import { render, replace, remove } from '../utils/render.js';
import { UpdateType } from '../const.js';

export default class MenuPresenter {
  constructor(container, filtersModel, pointsModel) {
    this._container = container;
    this._filtersModel = filtersModel;
    this._pointsModel = pointsModel;

    this._component = null;

    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _getFiltersCount() {
    const points = this._pointsModel.getItems();
    return getFilteredPointsCounts(points);
  }

  init(isDisable = false) {
    const oldComponent = this._component;
    this._component = new FiltersView(this._getFiltersCount(), this._filtersModel.getFilter(), isDisable);
    if (!isDisable) {
      this._component.setTypeChangeHandler(this._handleTypeChange);
    }
    if (oldComponent === null) {
      render(this._container, this._component);
      return;
    }
    replace(oldComponent, this._component);
    remove(oldComponent);
  }

  _handleTypeChange(filterType) {
    this._filtersModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent(_updateType, _activeFilter, isDisable) {
    this.init(isDisable);
  }
}
