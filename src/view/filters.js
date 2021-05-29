import AbstractView from './abstract.js';

const FILTER_CLASS = 'trip-filters__filter-input';
const FILTER_NAME_NUMBER = 0;
const FILTER_COUNT_NUMBER = 1;

const createFiltersElement = (filtersCount, activeFilter, isDisabled) => {
  const setDisabled = (item) => {
    if (isDisabled) {
      return 'disabled';
    }
    return item[FILTER_COUNT_NUMBER] ? '' : 'disabled';
  };
  const renderFilters = () => {
    return Object.entries(filtersCount).reduce((acc, item) => {
      return acc + `<div class="trip-filters__filter">
  <input id="filter-${item[FILTER_NAME_NUMBER]}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item[FILTER_NAME_NUMBER]}" ${activeFilter === item[FILTER_NAME_NUMBER] ? 'checked' : ''} ${setDisabled(item)}>
  <label class="trip-filters__filter-label" for="filter-${item[FILTER_NAME_NUMBER]}">${item[FILTER_NAME_NUMBER]} ${item[FILTER_COUNT_NUMBER]}</label>
</div>
`;
    }, '');
  };

  return `<form class="trip-filters" action="#" method="get">
  ${renderFilters()}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends AbstractView {
  constructor(count, activeFilter, isDisabled) {
    super();
    this._count = count;
    this._activeFilter = activeFilter;
    this._isDisabled = isDisabled;
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersElement(this._count, this._activeFilter, this._isDisabled);
  }

  setTypeChangeHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._typeChangeHandler);
  }

  _typeChangeHandler(evt) {
    const target = evt.target;
    const isTargetCorrect = target.classList.contains(FILTER_CLASS);
    if (!isTargetCorrect) {
      return;
    }
    evt.preventDefault();
    if (this._activeFilter === target.value) {
      return;
    }

    this._callback.filterClick(target.value);
  }

}
