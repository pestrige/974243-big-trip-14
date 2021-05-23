import AbstractView from './abstract.js';

const createTripInfoMainElement = () => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
</div>`;
};

export default class tripInfoMain extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripInfoMainElement();
  }
}
