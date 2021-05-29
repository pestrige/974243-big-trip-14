import AbstractView from './abstract.js';

const createEventsContainerElement = () => `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
</section>`;

export default class EventsContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createEventsContainerElement();
  }
}
