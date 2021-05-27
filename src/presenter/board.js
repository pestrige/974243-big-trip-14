import InfoPresenter from './info.js';
import PointPresenter from './point.js';
import PointFullPresenter from './point-full.js';

import MenuView from '../view/menu.js';
import LoadingView from '../view/loading.js';
import NoPointsView from '../view/no-points.js';
import SortView from '../view/sort.js';
import NewPointButtonView from '../view/new-point-button.js';
import PointsContainerView from '../view/pointsContainer';
import { render, remove } from '../utils/render.js';
import { sortByPrice } from '../utils/common.js';
import { sortByDate, sortByTime, filter } from '../utils/dates.js';
import { UpdateType, SortType, ActionType } from '../const';

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
    this._newPointButtonComponent = new NewPointButtonView();

    // options
    this._isLoading = true;
    this._isNewPointOpen = false;
    this._currentSortType = SortType.DAY;

    // handlers
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePointsListClick = this._handlePointsListClick.bind(this);
    this._handleSortButtonsClick = this._handleSortButtonsClick.bind(this);
    this._handleNewPointButtonClick = this._handleNewPointButtonClick.bind(this);
  }

  init() {
    this._render();
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  _getPoints({daySortOnly = false} = {}) {
    const points = this._pointsModel.getItems().slice();
    if (daySortOnly) {
      return points.sort(sortByDate);
    }

    const filterType = this._filtersModel.getFilter();
    const filteredPoints = filter[filterType](points);
    switch (this._currentSortType) {
      case SortType.DAY:
        filteredPoints.sort(sortByDate);
        break;
      case SortType.TIME:
        filteredPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortByPrice);
        break;
    }
    return filteredPoints;
  }

  // методы рендера
  _render() {
    const points = this._getPoints();
    this._renderHeader();
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

  _renderHeader() {
    this._infoPresenter = new InfoPresenter(this._headerContainer, this._getPoints({daySortOnly: true}));
    this._infoPresenter.init();

    render(this._menuContainer, this._menuComponent);
    render(this._headerContainer, this._newPointButtonComponent);
    this._newPointButtonComponent.setClickHandler(this._handleNewPointButtonClick);
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

  _renderPointFull(point = null, pointPresenter = null) {
    this._pointFullPresenter = new PointFullPresenter(
      this._pointsContainerComponent,
      this._destinationsModel,
      this._offersModel,
      this._isNewPointOpen,
      this._handleViewAction,
    );
    this._pointFullPresenter.init(point, pointPresenter);
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
    if (this._isNewPointOpen) {
      this._isNewPointOpen = false;
    }
    this._pointFullPresenter.destroy();
    this._pointFullPresenter = null;
    this._newPointButtonComponent.removeDisabled();
  }

  _rerenderPoint(updatedPoint) {
    const updatedPointPresenter = this._pointPresentersList.get(updatedPoint.id);
    updatedPointPresenter.init(updatedPoint);
  }

  // Обработчики
  _handleViewAction(userAction, updateType, data = null) {
    switch (userAction) {
      case ActionType.FAVORITE:
        this._pointsModel.updateData(data)
          .then((point) => this._pointsModel.updatePoint(updateType, point));
        break;
      case ActionType.CANCEL:
        this._clearPointFullPresenter();
        break;
      case ActionType.DELETE:
        this._pointsModel.deleteData(data)
          .then(() => this._pointsModel.deletePoint(updateType, data));
        break;
      case ActionType.ADD:
        this._pointsModel.addData(data)
          .then((point) => this._pointsModel.addPoint(updateType, point));
        break;
      case ActionType.UPDATE:
        this._pointsModel.updateData(data)
          .then((point) => this._pointsModel.updatePoint(updateType, point));
        break;
    }
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
      case UpdateType.MINOR:
        this._clear();
        this._render(data);
        break;
      case UpdateType.MAJOR:
        this._clear({resetSort: true});
        this._render(data);
        break;
    }
  }

  // обработчик открытия и закрытия карточки маршрута
  _handlePointsListClick(clickedPointID) {
    if (clickedPointID === 'null') {
      this._clearPointFullPresenter();
      return;
    }
    const pointPresenter = this._pointPresentersList.get(clickedPointID);
    const point = {...pointPresenter.getPoint()};

    if (this._isNewPointOpen) {
      this._clearPointFullPresenter();
    }

    if (this._pointFullPresenter) {
      const openedPointID = this._pointFullPresenter.getPoint().id;
      this._clearPointFullPresenter();
      if (openedPointID === clickedPointID) {
        return;
      }
    }
    // открываем карточку
    this._renderPointFull(point, pointPresenter);
  }

  _handleSortButtonsClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clear();
    this._render();
  }

  _handleNewPointButtonClick() {
    const isDefaults = () => {
      return this._currentSortType === SortType.DAY && this._filtersModel.isDefault();
    };

    if (!isDefaults()) {
      this._filtersModel.setDefault();
    }
    if (this._pointFullPresenter) {
      this._clearPointFullPresenter();
    }

    this._isNewPointOpen = true;
    this._newPointButtonComponent.setDisabled();
    this._renderPointFull();
  }
}
