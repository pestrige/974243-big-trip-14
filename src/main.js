import PointsModel from './model/points.js';

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
import { ApiUrl, DataType, UpdateType } from './const.js';

// Создаем экземпляры моделей
const pointsModel = new PointsModel();

// Получаем точки маршрута
pointsModel.getData(ApiUrl.POINTS, DataType.POINTS)
  .then((data) => {
    console.log(data);
    pointsModel.setItems(UpdateType.INIT, data);

    //
    const tripPointFullView = new TripPointFullView(pointsModel.getItems()[0]);
    render(tripPointsContainerView.getElement(), tripPointFullView);

    for (let i = 1; i < pointsModel.getItems().length - 1; i++) {
      const tripPointView = new TripPointView(pointsModel.getItems()[i]);
      render(tripPointsContainerView.getElement(), tripPointView);
    }
    //
  })
  .catch(() => pointsModel.setItems(UpdateType.INIT, []));

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

render(headerInfo, tripInfoContainerView, RenderPosition.START);
render(tripInfoContainerView.getElement(), tripInfoMainView);
render(tripInfoContainerView.getElement(), tripInfoPriceView);

render(menuContainer, menuView);
render(filterContainer, filtersView);

render(tripEventsContainer, sortView);
render(tripEventsContainer, tripPointsContainerView);

