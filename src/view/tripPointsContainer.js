import AbstractView from './abstract.js';

const createTripPointsContainerElement = () => '<ul class="trip-events__list"></ul>';

export default class tripPointsContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripPointsContainerElement();
  }
}
