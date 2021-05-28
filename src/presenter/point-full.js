import PointFullView from '../view/point-full.js';
import { remove, render, replace, renderTooltip } from '../utils/render.js';
import { ActionType, RenderPosition, PointState } from '../const.js';

export default class PointFullPresenter {
  constructor(containerComponent, destinationsModel, offersModel, isNewEvent, handleViewAction) {
    this._container = containerComponent.getElement();
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._isNewEvent = isNewEvent;
    this._component = null;
    this._handleViewAction = handleViewAction;
    this._handleEscKeydown = this._handleEscKeydown.bind(this);
  }

  init(point = null, pointPresenter = null) {
    this._render(
      point,
      pointPresenter,
      this._destinationsModel.getItems(),
      this._offersModel.getItems(),
    );
    document.addEventListener('keydown', this._handleEscKeydown);
    this._component.setResetButtonClickHandler(this._handleViewAction);
    this._component.setSubmitButtonClickHandler(this._handleViewAction);
  }

  getPoint() {
    return this._point;
  }

  getComponent() {
    return this._component;
  }

  setState(state, targetClass, payload) {
    const resetState = this._component.updateState({isSaving: false, isDeleting: false, isDisabled: false});
    const target = this._component.getElement().querySelector(`.${targetClass}`);
    switch (state) {
      case PointState.SAVING:
        this._component.updateState({isSaving: true, isDisabled: true}, {disableHandlers: true});
        break;
      case PointState.DELETING:
        this._component.updateState({isDeleting: true, isDisabled: true}, {disableHandlers: true});
        break;
      case PointState.ERROR:
        renderTooltip(target, `${payload}`);
        this._component.shake(this._component.getElement(), resetState);
        break;
    }
  }

  destroy() {
    this._component.removeDatePickers();
    if (this._pointPresenter) {
      replace(this._component, this._pointPresenter.getComponent());
    }
    remove(this._component);
    document.removeEventListener('keydown', this._handleEscKeydown);
  }

  _render(point, pointPresenter, destinations, offers) {
    this._point = point;
    this._pointPresenter = pointPresenter;
    const oldComponent = this._component;

    this._component = new PointFullView(this._point, destinations, offers, this._isNewEvent, this._handleViewAction);

    if (this._point === null) {
      render(this._container, this._component, RenderPosition.START);
      remove(oldComponent);
      return;
    }
    if (oldComponent === null) {
      replace(this._pointPresenter.getComponent(), this._component);
      return;
    }

    replace(oldComponent, this._component);
    remove(oldComponent);
  }

  _handleEscKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._handleViewAction(ActionType.CANCEL);
    }
  }
}
