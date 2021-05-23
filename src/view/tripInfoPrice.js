import AbstractView from './abstract.js';

const createTripInfoPriceElement = () => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`;
};

export default class tripInfoPrice extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripInfoPriceElement();
  }
}
