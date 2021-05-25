import AbstractSmartView from './abstract-smart.js';
import { humanizeDate, createDatePicker } from '../utils/dates.js';
import { DateType } from '../const.js';

const createPointFullElement = (point, allDestinations, allOffers, state) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    offers,
    type,
  } = point;

  const renderOffers = () => {
    const eventOffers = state.offerType
      ? allOffers.find((offer) => state.offerType === offer.type).offers
      : offers;
    if (eventOffers.length === 0) {
      return '';
    }

    const offerElements = eventOffers.reduce((acc, offer, id) => {
      const getIdName = () => `event-offer-${offer.title.split(' ').pop()}-${id}`;
      return acc + `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getIdName()}" type="checkbox" name="event-offer-${getIdName()}" checked>
  <label class="event__offer-label" for="event-offer-${getIdName()}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>
`;
    }, '');

    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offerElements}
    </div>
  </section>`;
  };

  const renderOffersTypeList = (offers) => {
    const offersTypeList = offers.reduce((acc, offer) => {
      return acc + `<div class="event__type-item">
  <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
  <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type}</label>
</div>
`;
    }, '');
    return offersTypeList;
  };

  const renderDestinations = (destinations) => {
    const destinationsList = destinations.reduce((acc, destination) => {
      return acc + `<option value="${destination.name}"></option>`;
    }, '');
    return destinationsList;
  };

  const renderDestination = (destination) => {
    const eventDestination = state.destinationName
      ? allDestinations.find((destination) => destination.name === state.destinationName)
      : destination;
    if (!eventDestination.name) {
      return '';
    }
    const destinationPictures = eventDestination.pictures.reduce((acc, picture) => {
      return acc + `<img class="event__photo" src="${picture.src}" alt="${picture.description}">
`;
    }, '');
    const renderPictures = () => `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${destinationPictures}
  </div>
</div>`;

    return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${eventDestination.description}</p>
  ${renderPictures()}
</section>`;
  };

  return `<li class="trip-events__item" data-id="${id}">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${state.offerType || type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${renderOffersTypeList(allOffers)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${state.offerType || type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${state.destinationName || destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${renderDestinations(allDestinations)};
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(state.dateFrom || dateFrom, DateType.FULL)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(state.dateTo || dateTo, DateType.FULL)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    </header>
    <section class="event__details">
      ${renderOffers()}

      ${renderDestination(destination)}
    </section>
  </form>
</li>`;
};

export default class PointFull extends AbstractSmartView {
  constructor(point, destinations, offers) {
    super();
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;
    this._datepickers = [];
    this._eventTypeInputClass = 'event__type-input';
    this._destinationInputClass = 'event__input';
    this._dateInputClass = 'event__input--time';

    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._dateInputChangeHandler = this._dateInputChangeHandler.bind(this);
    this._datePickerCloseHandler = this._datePickerCloseHandler.bind(this);
    this._setEventTypeClickHandler();
    this._setDestinationChangeHandler();
    this._setDatePickers();
  }

  getTemplate() {
    return createPointFullElement(this._point, this._destinations, this._offers, this._state);
  }

  restoreHandlers() {
    this._setEventTypeClickHandler();
    this._setDestinationChangeHandler();
    this._setDatePickers();
  }

  removeDatePickers() {
    this._datepickers.forEach((datepicker) => {
      datepicker.destroy();
    });
    this._datepickers = [];
  }

  _setDatePickers() {
    const containers = this.getElement().querySelectorAll('.event__input--time');
    const dateFrom = this._state.dateFrom || this._point.dateFrom;
    const dateTo = this._state.dateTo || this._point.dateTo;
    const minDate = dateFrom;

    if (this._datepickers.length) {
      this.removeDatePickers();
    }
    this._datepickers.push(createDatePicker(containers[0], dateFrom, this._dateInputChangeHandler, this._datePickerCloseHandler));
    this._datepickers.push(createDatePicker(containers[1], dateTo, this._dateInputChangeHandler, this._datePickerCloseHandler, minDate));
  }

  _setEventTypeClickHandler() {
    this.getElement().querySelector('.event__type-list')
      .addEventListener('click', this._eventTypeClickHandler);
  }

  _setDestinationChangeHandler() {
    this.getElement().querySelector('.event__input')
      .addEventListener('change', this._destinationInputHandler);
  }

  _eventTypeClickHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(this._eventTypeInputClass)) {
      return;
    }
    evt.preventDefault();
    this.updateState({offerType: target.value});
  }

  _destinationInputHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(this._destinationInputClass)) {
      return;
    }
    evt.preventDefault();
    this.updateState({destinationName: target.value});
  }

  _dateInputChangeHandler(selectedDate, _dateStr, instance) {
    const inputID = instance.input.id;
    switch (inputID) {
      case 'event-start-time-1':
        this._state = {...this._state, dateFrom: selectedDate[0]};
        break;
      case 'event-end-time-1':
        this._state = {...this._state, dateTo: selectedDate[0]};
    }
  }

  _datePickerCloseHandler() {
    const UPDATE_DELAY = 0; // без задержки flatpickr не удаляет свои onKeyDown
    setTimeout(() => {
      this.updateState(this._state);
    }, UPDATE_DELAY);
  }
}
