import Api from './api.js';
import { isOnline } from '../../utils/common.js';
import { DataType } from '../../const.js';

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    const key = current.id || current.name || current.type;
    return Object.assign({}, acc, {
      [key]: current,
    });
  }, {});
};

export default class Provider extends Api {
  constructor() {
    super();
  }

  getStore(store) {
    this._store = store;
    return this._store;
  }

  getCachedData(dataUrl, store, {dataType = DataType.OTHER}) {
    this._store = store;
    if (isOnline()) {
      return this.getData(dataUrl, dataType)
        .then((data) => {
          // В зависимости от типа данных обрабатываем их и передаем в хранилище
          const adaptedToServer = dataType === DataType.POINTS ? [...data].map(this._adaptToServer) : data;
          const items = createStoreStructure(adaptedToServer);
          this._store.setItems(items, dataType);
          return {data, isCached: true};
        });
    }

    // если офлайн, возвращаем данные из хранилища
    const storeData = Object.values(this._store.getItems(dataType));
    const adaptedStoreData = dataType === DataType.POINTS
      ? [...storeData].map((item) => this._adaptToClient(item))
      : storeData;
    // флаг, если нет закешированных данных (нужно для комментариев)
    const isCached = storeData.length > 0;
    return Promise.resolve({data: adaptedStoreData, isCached});
  }

  updateCachedData(data) {
    if (isOnline()) {
      return this.updateData(data)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, this._adaptToServer(updatedPoint), DataType.POINTS);
          return updatedPoint;
        });
    }

    this._store.setItem(data.id, this._adaptToServer(Object.assign({}, data)), DataType.POINTS);

    return Promise.resolve(data);
  }

  syncCached() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());
      return this.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const updatedPoints = response.updated;

          // Добавляем синхронизированные задачи в хранилище
          const items = createStoreStructure([ ...updatedPoints]);
          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
