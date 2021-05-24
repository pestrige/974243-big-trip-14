import AbstractView from './abstract.js';

const createNoPointsElement = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPoints extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createNoPointsElement();
  }
}
