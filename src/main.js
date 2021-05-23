import TripInfoContainerView from './view/tripInfoContainer.js';
import TripInfoMainView from './view/tripInfoMain.js';
import TripInfoPriceView from './view/tripInfoPrice.js';
import MenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import TripPointsContainerView from './view/tripPointsContainer';
import TripPointView from './view/tripPoint.js';
import TripPointFullView from './view/tripPointFull.js';
import { render } from './utils/render.js';
import { RenderPosition } from './const.js';

const headerInfo = document.querySelector('.trip-main');
const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripInfoContainerView = new TripInfoContainerView();
const tripInfoMainView = new TripInfoMainView();
const tripInfoPriceView = new TripInfoPriceView();
const menuView = new MenuView();
const filtersView = new FiltersView();
const sortView = new SortView();
const tripPointsContainerView = new TripPointsContainerView();
const tripPointView = new TripPointView();
const tripPointFullView = new TripPointFullView();

render(headerInfo, tripInfoContainerView, RenderPosition.START);
render(tripInfoContainerView.getElement(), tripInfoMainView);
render(tripInfoContainerView.getElement(), tripInfoPriceView);

render(menuContainer, menuView);
render(filterContainer, filtersView);

render(tripEventsContainer, sortView);
render(tripEventsContainer, tripPointsContainerView);
render(tripPointsContainerView.getElement(), tripPointView);
render(tripPointsContainerView.getElement(), tripPointFullView);
