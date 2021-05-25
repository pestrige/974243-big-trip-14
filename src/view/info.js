import AbstractView from './abstract.js';
import { humanizeDate } from '../utils/dates.js';
import { DateType } from '../const.js';

const MAX_SHOWN_DESTINATIONS = 3;

const createInfoElement = (points) => {
  const createRoute = () => {
    return points.length >= MAX_SHOWN_DESTINATIONS
      ? `${points[0].destination.name} — ... — ${points[points.length - 1].destination.name}`
      : `${points.map((point) => point.destination.name).join(' — ')}`;
  };

  const totalPrice = points.reduce((acc, point) => {
    return acc + point.basePrice + point.offers.reduce((sum, offer) => sum + offer.price, 0);
  }, 0);
  const startDate = humanizeDate(points[0].dateFrom, DateType.SHORT);
  const endDate = humanizeDate(points[points.length - 1].dateFrom, DateType.SHORT);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createRoute()}</h1>

    <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};

export default class Info extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoElement(this._points);
  }
}
