import PointsModel from './model/points.js';

import BoardPresenter from './presenter/board.js';


import { ApiUrl, DataType, UpdateType } from './const.js';

// Создаем экземпляры моделей
const pointsModel = new PointsModel();

// Получаем точки маршрута
pointsModel.getData(ApiUrl.POINTS, DataType.POINTS)
  .then((data) => {
    //console.log(data);
    pointsModel.setItems(UpdateType.INIT, data);
  })
  .catch(() => pointsModel.setItems(UpdateType.INIT, []));

const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(eventsContainer, headerContainer, pointsModel);
boardPresenter.init();
