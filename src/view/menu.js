import AbstractView from './abstract.js';
import { MenuType } from '../const.js';

const LINK_CLASS = 'trip-tabs__btn';
const ACTIVE_CLASS = 'trip-tabs__btn--active';

const createMenuElement = (activeLink) => {
  const setActiveClass = (currentType) => currentType === activeLink ? ACTIVE_CLASS : '';
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn ${setActiveClass(MenuType.POINTS)}" href="#" data-type=${MenuType.POINTS}>Table</a>
  <a class="trip-tabs__btn ${setActiveClass(MenuType.STATS)}" href="#" data-type=${MenuType.STATS}>Stats</a>
</nav>`;
};

export default class Menu extends AbstractView {
  constructor(activeLink) {
    super();
    this._activeLink = activeLink;
    this._linkClickHandler = this._linkClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuElement(this._activeLink);
  }

  setLinkClickHandler(callback) {
    this._callback.linkClick = callback;
    this.getElement().addEventListener('click', this._linkClickHandler);
  }

  _linkClickHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(LINK_CLASS)) {
      return;
    }
    evt.preventDefault();
    if(target.classList.contains(ACTIVE_CLASS)) {
      return;
    }
    const menuType = target.dataset.type;
    this._callback.linkClick(menuType);
  }
}
