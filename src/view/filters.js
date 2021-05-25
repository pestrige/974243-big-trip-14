import AbstractView from './abstract.js';

const FILTER_CLASS = 'trip-filters__filter-input';

const createFiltersElement = (filtersCount, activeFilter) => {
  const renderFilters = () => {
    return Object.entries(filtersCount).reduce((acc, item) => {
      return acc + `<div class="trip-filters__filter">
  <input id="filter-${item[0]}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item[0]}" ${activeFilter === item[0] ? 'checked' : ''} ${item[1] ? '' : 'disabled'}>
  <label class="trip-filters__filter-label" for="filter-${item[0]}">${item[0]} ${item[1]}</label>
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
  constructor(count, activeFilter) {
    super();
    this._count = count;
    this._activeFilter = activeFilter;
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersElement(this._count, this._activeFilter);
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
