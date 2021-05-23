import AbstractView from './abstract.js';

const createTripInfoContainerElement = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class tripInfoContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripInfoContainerElement();
  }
}
