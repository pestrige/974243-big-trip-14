import AbstractView from './abstract.js';
import { humanizeDate, getDateDiff } from '../utils/dates.js';
import { DateType } from '../const.js';

const FAVORITE_BUTTON_CLASS = 'event__favorite-btn';
const ACTIVE_BUTTON_CLASS = 'event__favorite-btn--active';

const createPointElement = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    isFavorite,
    offers,
    type,
  } = point;

  const formatDateTimeAttribute = (date, short = false) => {
    return short
      ? `${humanizeDate(date, DateType.DIGITS)}`
      : `${humanizeDate(date, DateType.DIGITS)}T${humanizeDate(date, DateType.MIN)}`;
  };

  const isFavoriteClass = () => isFavorite ? ACTIVE_BUTTON_CLASS : '';

  const renderOffers = () => {
    if (!offers.length) {
      return '';
    }

    const offersElements = offers.reduce((acc, offer) => {
      return acc + `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>
`;}, '');

    return `<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
  ${offersElements}
</ul>`;
  };

  return `<li class="trip-events__item" data-id="${id}">
  <div class="event">
    <time class="event__date" datetime="${formatDateTimeAttribute(dateFrom, true)}">${humanizeDate(dateFrom, DateType.SHORT)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatDateTimeAttribute(dateFrom)}">${humanizeDate(dateFrom, DateType.MIN)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatDateTimeAttribute(dateTo)}">${humanizeDate(dateTo, DateType.MIN)}</time>
      </p>
      <p class="event__duration">${getDateDiff(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    ${renderOffers()}
    <button class="event__favorite-btn ${isFavoriteClass()}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createPointElement(this._point);
  }

  setFavoriteButtonClick(callback) {
    this._callback.favoriteButtonClick = callback;
    this.getElement()
      .querySelector(`.${FAVORITE_BUTTON_CLASS}`)
      .addEventListener('click', this._favoriteButtonClickHandler);
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    const button = target.closest(`.${FAVORITE_BUTTON_CLASS}`);
    if (!button) {
      return;
    }

    this._callback.favoriteButtonClick(button.classList.contains(ACTIVE_BUTTON_CLASS));
  }
}
