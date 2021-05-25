import InfoPresenter from './info.js';
import PointPresenter from './point.js';
import PointFullPresenter from './point-full.js';

import MenuView from '../view/menu.js';
import LoadingView from '../view/loading.js';
import NoPointsView from '../view/no-points.js';
import SortView from '../view/sort.js';
import PointsContainerView from '../view/pointsContainer';
import { render, remove } from '../utils/render.js';
import { sortByPrice } from '../utils/common.js';
import { sortByDate, sortByTime, filter } from '../utils/dates.js';
import { UpdateType, SortType } from '../const';

export default class BoardPresenter {
  constructor(
    eventsContainer,
    headerContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filtersModel,
  ) {
    //containers
    this._eventsContainer = eventsContainer;
    this._headerContainer = headerContainer;
    this._menuContainer = this._headerContainer.querySelector('.trip-controls__navigation');

    //models
    this._pointsModel = pointsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._filtersModel = filtersModel;

    // presenters
    this._infoPresenter = null;
    this._pointFullPresenter = null;
    this._pointPresentersList = new Map();

    // dymanic components
    this._menuComponent = new MenuView();
    this._sortComponent = null;

    // static components
    this._loadingComponent = new LoadingView();
    this._noPointsComponent = new NoPointsView();
    this._pointsContainerComponent = new PointsContainerView();

    // options
    this._isLoading = true;
    this._currentSortType = SortType.DAY;

    // handlers
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePointsListClick = this._handlePointsListClick.bind(this);
    this._handleSortButtonsClick = this._handleSortButtonsClick.bind(this);
    this._handleEsckeydown = this._handleEsckeydown.bind(this);
  }

  init() {
    this._render();
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  _getPoints({totalCount = false} = {}) {
    const points = this._pointsModel.getItems().slice();
    const filterType = this._filtersModel.getFilter();
    const filteredPoints = filter[filterType](points);
    switch (this._currentSortType) {
      case SortType.DATE:
        filteredPoints.sort(sortByDate);
        break;
      case SortType.TIME:
        filteredPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortByPrice);
        break;
    }
    return totalCount ? points : filteredPoints;
  }

  // методы рендера
  _render() {
    const points = this._getPoints();
    this._renderInfo(this._headerContainer, this._pointsModel.getItems().slice());
    this._renderMenu();
    this._renderSort();
    if (this._isLoading) {
      render(this._eventsContainer, this._loadingComponent);
      return;
    }
    if (points.length < 0) {
      render(this._eventsContainer, this._noPointsComponent);
      return;
    }

    this._renderPointsContainer();
    this._renderPoints(points);
  }

  _renderInfo(headerContainer, points) {
    this._infoPresenter = new InfoPresenter(headerContainer, points);
    this._infoPresenter.init();
  }

  _renderMenu() {
    render(this._menuContainer, this._menuComponent);
  }

  _renderSort() {
    if (this._sortComponent) {
      remove(this._sortComponent);
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortButtonsClickHandler(this._handleSortButtonsClick);
    render(this._eventsContainer, this._sortComponent);
  }

  _renderPointsContainer() {
    render(this._eventsContainer, this._pointsContainerComponent);
    this._pointsContainerComponent.setPointClickHandler(this._handlePointsListClick);
  }

  _renderPoints(points) {
    const pointsContainer = this._pointsContainerComponent.getElement();
    points.forEach((point) => {
      this._renderPoint(pointsContainer, point);
    });
  }

  _renderPoint(container, point) {
    const pointPresenter = new PointPresenter(container, this._handleViewAction);
    pointPresenter.init(point);
    this._pointPresentersList.set(point.id, pointPresenter);
  }

  // методы очистки и обновления
  _clear({resetSort = false} ={}) {
    if (resetSort) {
      this._currentSortType = SortType.DAY;
    }
    if (this._pointFullPresenter) {
      this._clearPointFullPresenter();
    }

    this._pointPresentersList
      .forEach((point) => point.destroy());
    this._pointPresentersList.clear();
    remove(this._sortComponent);
    this._infoPresenter.destroy();
    this._infoPresenter = null;
  }

  _clearPointFullPresenter() {
    this._pointFullPresenter.destroy();
    this._pointFullPresenter = null;
  }

  _rerenderPoint(updatedPoint) {
    const updatedPointPresenter = this._pointPresentersList.get(updatedPoint.id);
    updatedPointPresenter.init(updatedPoint);
  }

  // Обработчики
  _handleViewAction(updateType, updatedPoint) {
    this._pointsModel.updateData(updatedPoint)
      .then((point) => this._pointsModel.updatePoint(updateType, point));
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false,
        remove(this._loadingComponent);
        this._render(data);
        break;
      case UpdateType.PATCH:
        this._rerenderPoint(data);
        break;
      case UpdateType.MAJOR:
        this._clear({resetSort: true});
        this._render(data);
        break;
    }
  }

  // обработчик открытия и закрытия карточки маршрута
  _handlePointsListClick(clickedPointID) {
    const pointPresenter = this._pointPresentersList.get(clickedPointID);
    const point = {...pointPresenter.getPoint()};

    if (this._pointFullPresenter) {
      const openedPointID = this._pointFullPresenter.getPoint().id;
      this._clearPointFullPresenter();
      if (openedPointID === clickedPointID) {
        return;
      }
    }
    // открываем карточку
    this._pointFullPresenter = new PointFullPresenter(this._pointsContainerComponent, this._destinationsModel, this._offersModel);
    this._pointFullPresenter.init(point, pointPresenter);
    this._pointFullPresenter.setEscKeydownHandler(this._handleEsckeydown);
  }

  _handleEsckeydown() {
    this._pointFullPresenter.destroy();
    this._pointFullPresenter = null;
  }

  _handleSortButtonsClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clear();
    this._render();
  }
}
