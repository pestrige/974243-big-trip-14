import InfoPresenter from './info.js';
import PointPresenter from './point.js';
import PointFullPresenter from './point-full.js';

import MenuView from '../view/menu.js';
import FiltersView from '../view/filters.js';

import LoadingView from '../view/loading.js';
import NoPointsView from '../view/no-points.js';
import SortView from '../view/sort.js';
import PointsContainerView from '../view/pointsContainer';
import { render, remove, replace } from '../utils/render.js';
import { UpdateType } from '../const';

export default class BoardPresenter {
  constructor(eventsContainer, headerContainer, pointsModel) {
    //containers
    this._eventsContainer = eventsContainer;
    this._headerContainer = headerContainer;
    this._menuContainer = this._headerContainer.querySelector('.trip-controls__navigation');
    this._filterContainer = this._headerContainer.querySelector('.trip-controls__filters');

    //models
    this._pointsModel = pointsModel;

    // presenters
    this._infoPresenter = null;
    this._pointFullPresenter = null;
    this._pointPresentersList = new Map();

    // menu && filters components
    this._menuComponent = new MenuView();
    this._filtersComponent = new FiltersView();

    // components
    this._loadingComponent = new LoadingView();
    this._noPointsComponent = new NoPointsView();
    this._pointsContainerComponent = new PointsContainerView();
    this._sortComponent = new SortView();

    // options
    this._isLoading = true;

    // handlers
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePointsListClick = this._handlePointsListClick.bind(this);
  }

  init() {
    this._render();
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _getPoints() {
    const points = this._pointsModel.getItems().slice();
    return points;
  }

  _render() {
    const points = this._getPoints();
    this._renderInfo(this._headerContainer, points);
    this._renderMenu();
    this._renderFilters();
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

  _renderFilters() {
    render(this._filterContainer, this._filtersComponent);
  }

  _renderSort() {
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
    const pointPresenter = new PointPresenter(container);
    pointPresenter.init(point);
    this._pointPresentersList.set(point.id, pointPresenter);
  }

  // Обработчики
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false,
        remove(this._loadingComponent);
        this._render(data);
    }
  }

  _handlePointsListClick(pointID) {
    const pointPresenter = this._pointPresentersList.get(pointID);
    const point = {...pointPresenter.getPoint()};

    if (this._pointFullPresenter) {
      const openedPointID = this._pointFullPresenter.getPoint().id;
      const oldPointPresenter = this._pointPresentersList.get(openedPointID);

      replace(this._pointFullPresenter.getComponent(), oldPointPresenter.getComponent());
      this._pointFullPresenter.destroy();
      this._pointFullPresenter = null;
      if (openedPointID === pointID) {
        return;
      }
    }
    // открываем карточку
    this._pointFullPresenter = new PointFullPresenter(this._pointsContainerComponent);
    this._pointFullPresenter.init(point, pointPresenter);
  }
}
