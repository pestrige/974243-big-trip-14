import InfoView from '../view/info.js';
import { render, remove } from '../utils/render.js';
import { RenderPosition } from '../const';

export default class Info {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._component = null;
  }

  init() {
    if (this._points.length > 0) {
      this._render();
    }
  }

  destroy() {
    remove(this._component);
  }

  _render() {
    const oldComponent = this._component;
    this._component = new InfoView(this._points);

    if (oldComponent !== null) {
      remove(oldComponent);
    }

    render(this._container, this._component, RenderPosition.START);
  }
}

