import AbstractView from './abstract.js';
import { SortType } from '../const.js';

const SORT_INPUT_CLASS = 'trip-sort__input';

const createSortElement = (sortType) => {
  const isChecked = (currentSortType) => sortType === currentSortType ? 'checked' : '';

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${isChecked(SortType.DAY)}>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${isChecked(SortType.TIME)}>
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${isChecked(SortType.PRICE)}>
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
};

export default class Sort extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortButtonsClickHandler = this._sortButtonsClickHandler.bind(this);
  }

  getTemplate() {
    return createSortElement(this._sortType);
  }

  setSortButtonsClickHandler(callback) {
    this._callback.sortButtonsClick = callback;
    this.getElement()
      .addEventListener('click', this._sortButtonsClickHandler);
  }

  _sortButtonsClickHandler(evt) {
    const target = evt.target;

    if (!target.classList.contains(SORT_INPUT_CLASS)) {
      return;
    }
    evt.preventDefault();
    this._callback.sortButtonsClick(target.value);
  }
}

