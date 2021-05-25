import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import BoardPresenter from './presenter/board.js';

import { ApiUrl, DataType, UpdateType } from './const.js';

// Создаем экземпляры моделей
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

// Получаем точки маршрута
pointsModel.getData(ApiUrl.POINTS, DataType.POINTS)
  .then((data) => {
    pointsModel.setItems(UpdateType.INIT, data);
  })
  .catch(() => pointsModel.setItems(UpdateType.INIT, []));

// Получаем направления
destinationsModel.getData(ApiUrl.DESTINATIONS, DataType.OTHER)
  .then((destinations) => {
    destinationsModel.setItems(destinations);
  })
  .catch(() => destinationsModel.setItems([]));

// Получаем офферы
offersModel.getData(ApiUrl.OFFERS, DataType.OTHER)
  .then((destinations) => {
    offersModel.setItems(destinations);
  })
  .catch(() => offersModel.setItems([]));

const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(
  eventsContainer,
  headerContainer,
  pointsModel,
  destinationsModel,
  offersModel,
);
boardPresenter.init();
