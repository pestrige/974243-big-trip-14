import AbstractSmartView from './abstract-smart.js';
import { humanizeDate, isDateInRange, createDatePicker } from '../utils/dates.js';
import { DateType, ActionType, UpdateType, TargetClass, ConnectionStatus, ErrorMessage } from '../const.js';
import { renderTooltip } from '../utils/render.js';
import { isOnline } from '../utils/common.js';
import he from 'he';

const DATE_PICKER_DATE_TO = 1;
const DEFAULT_OFFER_TYPE = 'taxi';
const DEFAULT_OFFERS = [];

const createPointFullElement = (point, allDestinations, allOffers, state, isNewEvent) => {
  const {
    basePrice = state.basePrice || '',
    dateFrom = new Date(),
    dateTo = new Date(),
    destination = {name: ''},
    id = null,
    offers = DEFAULT_OFFERS,
    type = DEFAULT_OFFER_TYPE,
  } = point;
  const renderOffers = () => {
    const eventOffers = state.offerType
      ? allOffers.find((offer) => state.offerType === offer.type).offers
      : allOffers.find((offer) => type === offer.type).offers;

    if (!eventOffers.length) {
      return '';
    }

    const offerElements = eventOffers.reduce((acc, offer, id) => {
      const getIdName = () => `event-offer-${offer.title.split(' ').pop()}-${id}`;
      const isChecked = () => (state.offers || offers).some((item) => item.title === offer.title);

      return acc + `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getIdName()}" type="checkbox" name="event-offer-${getIdName()}" ${isChecked() ? 'checked' : ''} ${state.isDisabled ? 'disabled' : ''}>
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
  <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${state.isDisabled ? 'disabled' : ''}>
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
      return acc + `<img class="event__photo" src="${state.isOffline ? './img/photos/placeholder.jpg' : picture.src}" alt="${picture.description}">
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
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${state.isDisabled ? 'disabled' : ''}>

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(state.destinationName || destination.name)}" list="destination-list-1" ${state.isDisabled ? 'disabled' : ''} required autocomplete="off">
        <datalist id="destination-list-1">
          ${renderDestinations(allDestinations)};
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(state.dateFrom || dateFrom, DateType.FULL)}" ${state.isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(state.dateTo || dateTo, DateType.FULL)}" ${state.isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${state.basePrice || basePrice}" required autocomplete="off" ${state.isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${state.isDisabled ? 'disabled' : ''}>${state.isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${state.isDisabled ? 'disabled' : ''}>${isNewEvent ? 'Cancel' : state.isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button" ${state.isDisabled ? 'disabled' : ''}>
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
  constructor(point, destinations, offers, isNewEvent, connectionObserver) {
    super();
    this._point = point || {};
    this._destinations = destinations;
    this._offers = offers;
    this._isNewEvent = isNewEvent;
    this._datepickers = [];
    this._connectionObserver = connectionObserver;

    this._dateInputClass = 'event__input--time';
    this._destinationInputClass = 'event__input';
    this._eventTypeInputClass = 'event__type-input';
    this._offerCheckboxClass = 'event__offer-checkbox';
    this._submitButtonClass = 'event__save-btn';

    this._dateInputChangeHandler = this._dateInputChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._offersListClickHandler = this._offersListClickHandler.bind(this);
    this._priceInpitChangeHandler = this._priceInpitChangeHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._submitButtonClickHandler = this._submitButtonClickHandler.bind(this);
    this._handleConnectionStatus = this._handleConnectionStatus.bind(this);

    this._setDatePickers();
    this._setInnerHandlers();

    this._connectionObserver.addObserver(this._handleConnectionStatus);
  }

  getTemplate() {
    this.updateState({isOffline: !isOnline()}, {justUpdate: true});
    return createPointFullElement(this._point, this._destinations, this._offers, this._state, this._isNewEvent);
  }

  // слушатели
  setSubmitButtonClickHandler(callback) {
    this._callback.submitButtonClick = callback;
    this.getElement().querySelector('form.event')
      .addEventListener('submit', this._submitButtonClickHandler);
  }

  setResetButtonClickHandler(callback) {
    this._callback.resetButtonClick = callback;
    this.getElement().querySelector('.event__reset-btn')
      .addEventListener('click', this._resetButtonClickHandler);
  }

  _setInnerHandlers() {
    const offersContainer = this.getElement().querySelector('.event__available-offers');
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._eventTypeClickHandler);
    this.getElement().querySelector('.event__input').addEventListener('change', this._destinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceInpitChangeHandler);
    if (offersContainer) {
      offersContainer.addEventListener('change', this._offersListClickHandler);
    }
  }

  // инициируем календарь
  _setDatePickers() {
    const containers = this.getElement().querySelectorAll('.event__input--time');
    const dateFrom = this._state.dateFrom || this._point.dateFrom || new Date();
    const dateTo = this._state.dateTo || this._point.dateTo || new Date();
    let validDateTo = null;
    if (isDateInRange(dateTo, dateFrom)) {
      validDateTo = dateTo;
    } else {
      validDateTo = dateFrom;
      this.updateState({dateTo: validDateTo}, {justUpdate: true});
    }

    if (this._datepickers.length) {
      this.removeDatePickers();
    }
    this._datepickers.push(createDatePicker(containers[0], dateFrom, this._dateInputChangeHandler));
    this._datepickers.push(createDatePicker(containers[DATE_PICKER_DATE_TO], validDateTo, this._dateInputChangeHandler, dateFrom));
  }

  restoreHandlers() {
    this.setSubmitButtonClickHandler(this._callback.submitButtonClick);
    this.setResetButtonClickHandler(this._callback.resetButtonClick);

    this._setDatePickers();
    this._setInnerHandlers();
  }

  removeHandlers() {
    this.removeDatePickers();
    this.getElement().querySelector('form.event').removeEventListener('submit', this._submitButtonClickHandler);
    this.getElement().querySelector('.event__reset-btn').removeEventListener('click', this._resetButtonClickHandler);
    this._removeInnerHandlers();
  }

  removeDatePickers() {
    this._datepickers.forEach((datepicker) => {
      datepicker.destroy();
    });
    this._datepickers = [];
  }

  _removeInnerHandlers() {
    const offersContainer = this.getElement().querySelector('.event__available-offers');
    this.getElement().querySelector('.event__type-list').removeEventListener('click', this._eventTypeClickHandler);
    this.getElement().querySelector('.event__input').addEventListener('change', this._destinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceInpitChangeHandler);
    if (offersContainer) {
      offersContainer.addEventListener('change', this._offersListClickHandler);
    }
  }

  _adaptStateToData() {
    const currentDestination = this._destinations
      .find((destination) => destination.name === (this._state.destinationName || this._point.destination.name));

    return this._isNewEvent
      ? {
        basePrice: Number(this._state.basePrice || this._point.basePrice),
        dateFrom: this._state.dateFrom || this._point.dateFrom || new Date(),
        dateTo: this._state.dateTo || this._point.dateTo || new Date(),
        destination: currentDestination,
        isFavorite: false,
        offers: this._state.offers || this._point.offers || DEFAULT_OFFERS,
        type: this._state.offerType || this._point.type || DEFAULT_OFFER_TYPE,
      }
      : {
        basePrice: Number(this._state.basePrice || this._point.basePrice),
        dateFrom: this._state.dateFrom || this._point.dateFrom,
        dateTo: this._state.dateTo || this._point.dateTo,
        destination: currentDestination,
        id: this._point.id,
        isFavorite: this._point.isFavorite,
        offers: this._state.offers || this._point.offers,
        type: this._state.offerType || this._point.type,
      };
  }

  // обработчики
  _submitButtonClickHandler(evt) {
    evt.preventDefault();
    if (this._state.isOffline) {
      const button = evt.target.querySelector(`.${this._submitButtonClass}`);
      const errorMeggage = this._isNewEvent ? ErrorMessage.SUBMIT_OFFLINE : ErrorMessage.SAVING_OFFLINE;
      const tooltip = renderTooltip(button, errorMeggage);
      this.shake(button, tooltip);
      return;
    }
    const actionType = this._isNewEvent ? ActionType.ADD : ActionType.UPDATE;
    this._callback.submitButtonClick(actionType, UpdateType.MINOR, this._adaptStateToData(), TargetClass.SUBMIT);
  }

  _resetButtonClickHandler(evt) {
    evt.preventDefault();
    if (this._state.isOffline && !this._isNewEvent) {
      const tooltip = renderTooltip(evt.target, ErrorMessage.DELETING_OFFLINE);
      this.shake(evt.target, tooltip);
      return;
    }
    const actionType = this._isNewEvent ? ActionType.CANCEL : ActionType.DELETE;
    const pointID = this._isNewEvent ? null : this._point.id;
    this._callback.resetButtonClick(actionType, UpdateType.MINOR, pointID, TargetClass.DELETE);
  }

  _eventTypeClickHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(this._eventTypeInputClass)) {
      return;
    }
    evt.preventDefault();
    this.updateState({offerType: target.value, offers: []});
  }

  _destinationChangeHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(this._destinationInputClass)) {
      return;
    }
    evt.preventDefault();
    const isValidDestination = this._destinations.some((destination) => destination.name === target.value);
    if(!isValidDestination) {
      const tooltip = renderTooltip(target, ErrorMessage.DESTINATION);
      this.shake(target, tooltip);
      return target.setCustomValidity(ErrorMessage.DESTINATION);
    }
    this.updateState({destinationName: target.value});
  }

  _offersListClickHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(this._offerCheckboxClass)) {
      return;
    }
    const checkedOfferElements = this.getElement().querySelectorAll('.event__offer-checkbox:checked');
    const checkedOffers = [];
    checkedOfferElements.forEach((element) => {
      const offerText = element.parentElement.querySelector('.event__offer-title').innerText;
      const offerPrice = Number(element.parentElement.querySelector('.event__offer-price').innerText);
      checkedOffers.push({title: offerText, price: offerPrice});
    });
    this.updateState({offers: checkedOffers}, {justUpdate: true});
  }

  _priceInpitChangeHandler(evt) {
    evt.preventDefault();
    this.updateState({basePrice: evt.target.value}, {justUpdate: true});
  }

  _dateInputChangeHandler(selectedDate, _dateStr, instance) {
    const inputID = instance.input.id;
    switch (inputID) {
      case 'event-start-time-1':
        this.updateState({dateFrom: selectedDate[0]}, {justUpdate: true});
        this._datepickers[DATE_PICKER_DATE_TO].set('minDate', selectedDate[0]);
        if (selectedDate[0] > (this._state.dateTo || this._point.dateTo || new Date())) {
          this._datepickers[DATE_PICKER_DATE_TO].setDate(selectedDate[0]);
          this.updateState({dateTo: selectedDate[0]}, {justUpdate: true});
        }
        break;
      case 'event-end-time-1':
        this.updateState({dateTo: selectedDate[0]}, {justUpdate: true});
    }
  }

  _handleConnectionStatus(status) {
    switch (status) {
      case ConnectionStatus.ONLINE:
        this.updateState({isOffline: false}, {justUpdate: true});
        break;
      case ConnectionStatus.OFFLINE:
        this.updateState({isOffline: true}, {justUpdate: true});
    }
  }
}
