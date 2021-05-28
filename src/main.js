import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import FiltersModel from './model/filters.js';
import ConnectionObserver from './model/connection-observer.js';

import Store from './model/api/store.js';
import Provider from './model/api/provider.js';

import BoardPresenter from './presenter/board.js';
import FiltersPresenter from './presenter/filters.js';

import { ApiUrl, DataType, UpdateType } from './const.js';

// Создаем экземпляры моделей
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();
const connectionObserver = new ConnectionObserver();

// Создаем хранилище
const provider = new Provider();
const store = provider.getStore(new Store(window.localStorage));

// Получаем точки маршрута
pointsModel.getCachedData(ApiUrl.POINTS, store, {dataType: DataType.POINTS})
  .then(({data}) => {
    pointsModel.setItems(UpdateType.INIT, data);
  })
  .catch(() => pointsModel.setItems(UpdateType.INIT, []));

// Получаем направления
destinationsModel.getCachedData(ApiUrl.DESTINATIONS, store, {dataType: DataType.DESTINATIONS})
  .then(({data}) => {
    destinationsModel.setItems(data);
  })
  .catch(() => destinationsModel.setItems([]));

// Получаем офферы
offersModel.getCachedData(ApiUrl.OFFERS, store, {dataType: DataType.OFFERS})
  .then(({data}) => {
    offersModel.setItems(data);
  })
  .catch(() => offersModel.setItems([]));

const headerContainer = document.querySelector('.trip-main');
const bodyContainer = document.querySelector('.trip-container');
const filtersContainer = document.querySelector('.trip-controls__filters');

const filtersPresenter = new FiltersPresenter(filtersContainer, filtersModel, pointsModel);
const boardPresenter = new BoardPresenter(
  bodyContainer,
  headerContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filtersModel,
  connectionObserver,
);
filtersPresenter.init();
boardPresenter.init();

// подключаем service worker, если его поддерживает браузер
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

connectionObserver.init(provider);
