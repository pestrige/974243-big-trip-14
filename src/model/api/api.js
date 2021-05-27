import { ApiUrl, DataType } from '../../const.js';

const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};
const SuccessServerStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor() {
    this._authorization = null;
    this._endPoint = END_POINT;
  }

  _getToken() {
    const token = localStorage.getItem('token');
    token ? this._authorization = token : this._generateToken();
  }

  addData(data) {
    const adaptedData = this._adaptToServer(data);
    return this._load({
      url: `${ApiUrl.POINTS}`,
      method: Method.POST,
      body: JSON.stringify(adaptedData),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((newPoint) => this._adaptToClient(newPoint));
  }

  getData(dataUrl, dataType = DataType.OTHER) {
    return this._load({url: dataUrl})
      .then(Api.toJSON)
      .then((data) => {
        switch (dataType) {
          case DataType.POINTS:
            return this._adaptToClient(data);
          case DataType.OTHER:
          default:
            return data;
        }
      });
  }

  updateData(data) {
    const adaptedData = this._adaptToServer(data);
    return this._load({
      url: `${ApiUrl.POINTS}/${adaptedData.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedData),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((data) => this._adaptToClient(data));
  }

  deleteData(id) {
    return this._load({
      url: `${ApiUrl.POINTS}/${id}`,
      method: Method.DELETE,
    });
  }

  // sync(data) {
  //   return this._load({
  //     url: `${ApiUrl.MOVIES}/sync`,
  //     method: Method.POST,
  //     body: JSON.stringify(data),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   })
  //     .then(Api.toJSON);
  // }

  _generateToken() {
    const randomString = Math.random().toString(36).replace(/[.]/g, '');
    this._authorization = `Basic ${randomString}`;
    localStorage.setItem('token', this._authorization);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    this._getToken();
    headers.append('Authorization', this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  _adaptToClient(data) {
    return Array.isArray(data)
      ? data.map((point) => this._adaptPointToClient(point))
      : this._adaptPointToClient(data);
  }

  _adaptPointToClient(point) {
    return {
      basePrice: point.base_price,
      dateFrom: new Date(point.date_from),
      dateTo: new Date(point.date_to),
      destination: point.destination,
      id: point.id,
      isFavorite: point.is_favorite,
      offers: point.offers,
      type: point.type,
    };
  }

  _adaptToServer(point) {
    return {
      'base_price': point.basePrice,
      'date_from': point.dateFrom.toISOString(),
      'date_to': point.dateTo.toISOString(),
      'destination': point.destination,
      'id': point.id,
      'is_favorite': point.isFavorite,
      'offers': point.offers,
      'type': point.type,
    };
  }

  static checkStatus(response) {
    if (response.status < SuccessServerStatusRange.MIN || response.status > SuccessServerStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(error) {
    throw error;
  }
}
