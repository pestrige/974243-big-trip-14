import { DataType } from '../../const.js';

const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_VER = 'v1.0';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export default class Store {
  constructor(storage) {
    this._storage = storage;
    this._storeKey = STORE_NAME;
  }

  getItems(dataType = DataType.POINTS) {
    const cacheName = this._getCacheName(dataType);
    try {
      return JSON.parse(this._storage.getItem(cacheName)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, dataType) {
    const cacheName = this._getCacheName(dataType);
    this._storage.setItem(
      cacheName,
      JSON.stringify(items),
    );
  }

  setItem(key, value, dataType) {
    const store = this.getItems(dataType);
    const cacheName = this._getCacheName(dataType);

    this._storage.setItem(
      cacheName,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value,
        }),
      ),
    );
  }

  _getCacheName(dataType) {
    return dataType === DataType.POINTS
      ? `${this._storeKey}-${dataType}`
      : `${this._storeKey}-${dataType}`;
  }
}
