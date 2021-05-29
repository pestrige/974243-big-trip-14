import InfoPresenter from './info.js';
import PointPresenter from './point.js';
import PointFullPresenter from './point-full.js';

import MenuView from '../view/menu.js';
import LoadingView from '../view/loading.js';
import NoPointsView from '../view/no-points.js';
import SortView from '../view/sort.js';
import NewPointButtonView from '../view/new-point-button.js';
import EventsContainerView from '../view/events-container.js';
import PointsContainerView from '../view/points-container.js';
import StatsView from '../view/stats.js';
import { render, remove } from '../utils/render.js';
import { sortByPrice } from '../utils/common.js';
import { sortByDate, sortByTime, filter } from '../utils/dates.js';
import { UpdateType, SortType, ActionType, MenuType, PointState } from '../const';

export default class Board {
  constructor(
    bodyContainer,
    headerContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filtersModel,
    connectionObserver,
  ) {
    //containers
    this._bodyContainer = bodyContainer;
    this._eventsContainer = null;
    this._headerContainer = headerContainer;
    this._menuContainer = this._headerContainer.querySelector('.trip-controls__navigation');

    //models
    this._pointsModel = pointsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._filtersModel = filtersModel;

    //observer
    this._connectionObserver = connectionObserver;

    // presenters
    this._infoPresenter = null;
    this._pointFullPresenter = null;
    this._pointPresentersList = new Map();

    // dynamic components
    this._sortComponent = null;
    this._menuComponent = null;
    this._statsComponent = null;

    // static components
    this._loadingComponent = new LoadingView();
    this._noPointsComponent = new NoPointsView();
    this._eventsContainerComponent = new EventsContainerView();
    this._pointsContainerComponent = new PointsContainerView();
    this._newPointButtonComponent = new NewPointButtonView();

    // options
    this._isLoading = true;
    this._isNewPointOpen = false;
    this._isStatsOpen = false;
    this._currentSortType = SortType.DAY;
    this._activeMenu = MenuType.POINTS;

    // handlers
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePointsListClick = this._handlePointsListClick.bind(this);
    this._handleSortButtonsClick = this._handleSortButtonsClick.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);
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
    if (this._isStatsOpen) {
      this._renderStats();
      return;
    }
    this._renderEventsContainer();
    if (this._isLoading) {
      render(this._eventsContainer, this._loadingComponent);
      return;
    }
    if (!points.length) {
      render(this._eventsContainer, this._noPointsComponent);
      return;
    }

    this._renderSort();
    this._renderPointsContainer();
    this._renderPoints(points);
  }

  _renderHeader() {
    this._infoPresenter = new InfoPresenter(this._headerContainer, this._getPoints({daySortOnly: true}));
    this._infoPresenter.init();

    if (this._menuComponent) {
      remove(this._menuComponent);
      this._menuComponent = null;
    }
    this._menuComponent = new MenuView(this._activeMenu);
    render(this._menuContainer, this._menuComponent);
    this._menuComponent.setLinkClickHandler(this._handleMenuClick);

    render(this._headerContainer, this._newPointButtonComponent);
    if (this._isStatsOpen) {
      this._newPointButtonComponent.setDisabled();
      this._newPointButtonComponent.removeClickHandler();
      return;
    }
    this._newPointButtonComponent.removeDisabled();
    this._newPointButtonComponent.setClickHandler(this._handleNewPointButtonClick);
  }

  _renderEventsContainer() {
    render(this._bodyContainer, this._eventsContainerComponent);
    this._eventsContainer = this._eventsContainerComponent.getElement();
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
      this._connectionObserver,
    );
    this._pointFullPresenter.init(point, pointPresenter);
  }

  _renderStats() {
    this._statsComponent = new StatsView(this._getPoints({daySortOnly: true}));
    render(this._bodyContainer, this._statsComponent);
  }

  // методы очистки и обновления
  _clear({resetSort = false} ={}) {
    if (resetSort) {
      this._currentSortType = SortType.DAY;
    }

    if(this._statsComponent) {
      remove(this._statsComponent);
      this._statsComponent = null;
    }
    if (this._pointFullPresenter) {
      this._clearPointFullPresenter();
    }
    this._pointPresentersList
      .forEach((point) => point.destroy());
    this._pointPresentersList.clear();
    remove(this._menuComponent);
    remove(this._sortComponent);
    remove(this._eventsContainerComponent);
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
    this._newPointButtonComponent.setClickHandler(this._handleNewPointButtonClick);
  }

  _rerenderPoint(updatedPoint) {
    const updatedPointPresenter = this._pointPresentersList.get(updatedPoint.id);
    updatedPointPresenter.init(updatedPoint);
  }

  // Обработчики
  _handleViewAction(userAction, updateType, data = null, target = null) {
    switch (userAction) {
      case ActionType.FAVORITE:
        this._pointsModel.updateCachedData(data)
          .then((point) => this._pointsModel.updatePoint(updateType, point));
        break;
      case ActionType.CANCEL:
        this._clearPointFullPresenter();
        break;
      case ActionType.DELETE:
        this._pointFullPresenter.setState(PointState.DELETING);
        this._pointsModel.deleteData(data)
          .then(() => this._pointsModel.deletePoint(updateType, data))
          .catch((error) => this._pointFullPresenter.setState(PointState.ERROR, target, error));
        break;
      case ActionType.ADD:
        this._pointFullPresenter.setState(PointState.SAVING);
        this._pointsModel.addData(data)
          .then((point) => this._pointsModel.addPoint(updateType, point))
          .catch((error) => this._pointFullPresenter.setState(PointState.ERROR, target, error));
        break;
      case ActionType.UPDATE:
        this._pointFullPresenter.setState(PointState.SAVING);
        this._pointsModel.updateData(data)
          .then((point) => this._pointsModel.updatePoint(updateType, point))
          .catch((error) => this._pointFullPresenter.setState(PointState.ERROR, target, error));
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
    if (!this._getPoints().length) {
      remove(this._noPointsComponent);
      this._renderSort();
      this._renderPointsContainer();
    }

    this._isNewPointOpen = true;
    this._newPointButtonComponent.setDisabled();
    this._newPointButtonComponent.removeClickHandler();
    this._renderPointFull();
  }

  _handleMenuClick(menuType) {
    switch (menuType) {
      case MenuType.POINTS:
        this._activeMenu = MenuType.POINTS;
        this._isStatsOpen = false;
        this._filtersModel.setDefault({notifyOnly: true, setDisabled: false});
        break;
      case MenuType.STATS:
        this._activeMenu = MenuType.STATS;
        this._isStatsOpen = true;
        this._filtersModel.setDefault({notifyOnly: true, setDisabled: true});
        break;
    }
  }
}
