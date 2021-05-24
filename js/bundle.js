/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});


/***/ }),

/***/ "./node_modules/dayjs/plugin/isSameOrBefore.js":
/*!*****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrBefore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";return function(e,t){t.prototype.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)}}});


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: RenderPosition, ApiUrl, DataType, DateType, UpdateType, SortType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUrl", function() { return ApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataType", function() { return DataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateType", function() { return DateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateType", function() { return UpdateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
const RenderPosition = {
  START: 'afterbegin',
  END: 'beforeend',
};
const ApiUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
};
const DataType = {
  POINTS: 'points',
  OTHER: 'other',
};
const DateType = {
  DIGITS: 'digits',
  SHORT: 'short',
  FULL: 'full',
};
const UpdateType = {
  INIT: 'init',
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_points_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/points.js */ "./src/model/points.js");
/* harmony import */ var _presenter_board_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter/board.js */ "./src/presenter/board.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "./src/const.js");







// Создаем экземпляры моделей
const pointsModel = new _model_points_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

// Получаем точки маршрута
pointsModel.getData(_const_js__WEBPACK_IMPORTED_MODULE_2__["ApiUrl"].POINTS, _const_js__WEBPACK_IMPORTED_MODULE_2__["DataType"].POINTS)
  .then((data) => {
    //console.log(data);
    pointsModel.setItems(_const_js__WEBPACK_IMPORTED_MODULE_2__["UpdateType"].INIT, data);
  })
  .catch(() => pointsModel.setItems(_const_js__WEBPACK_IMPORTED_MODULE_2__["UpdateType"].INIT, []));

const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new _presenter_board_js__WEBPACK_IMPORTED_MODULE_1__["default"](eventsContainer, headerContainer, pointsModel);
boardPresenter.init();


/***/ }),

/***/ "./src/model/abstract-model.js":
/*!*************************************!*\
  !*** ./src/model/abstract-model.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractModel; });
/* harmony import */ var _api_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/provider.js */ "./src/model/api/provider.js");


class AbstractModel extends _api_provider_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((item) => item !== observer);
  }

  _notify(event, update, payload) {
    this._observers.forEach((observer) => observer(event, update, payload));
  }
}


/***/ }),

/***/ "./src/model/api/api.js":
/*!******************************!*\
  !*** ./src/model/api/api.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const.js */ "./src/const.js");


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

class Api {
  constructor() {
    this._authorization = null;
    this._endPoint = END_POINT;
  }

  _getToken() {
    const token = localStorage.getItem('token');
    token ? this._authorization = token : this._generateToken();
  }

  // addData(data) {
  //   return this._load({
  //     url: `${ApiUrl.COMMENTS}/${data.id}`,
  //     method: Method.POST,
  //     body: JSON.stringify(data.comment),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   })
  //     .then(Api.toJSON)
  //     .then(({movie}) => this._adaptToClient(movie));
  // }

  getData(dataUrl, dataType = _const_js__WEBPACK_IMPORTED_MODULE_0__["DataType"].OTHER) {
    return this._load({url: dataUrl})
      .then(Api.toJSON)
      .then((data) => {
        switch (dataType) {
          case _const_js__WEBPACK_IMPORTED_MODULE_0__["DataType"].POINTS:
            return this._adaptToClient(data);
          case _const_js__WEBPACK_IMPORTED_MODULE_0__["DataType"].OTHER:
          default:
            return data;
        }
      });
  }

  updateData(data) {
    const adaptedData = this._adaptToServer(data);
    return this._load({
      url: `${_const_js__WEBPACK_IMPORTED_MODULE_0__["ApiUrl"].POINTS}/${adaptedData.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedData),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((data) => this._adaptToClient(data));
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

  // _deleteCommentFromServer(id) {
  //   return this._load({
  //     url: `${ApiUrl.COMMENTS}/${id}`,
  //     method: Method.DELETE,
  //   });
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


/***/ }),

/***/ "./src/model/api/provider.js":
/*!***********************************!*\
  !*** ./src/model/api/provider.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Provider; });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/model/api/api.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../const.js */ "./src/const.js");




const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

class Provider extends _api_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getStore(store) {
    this._store = store;
    return this._store;
  }

  getDataToCache(dataUrl, store, {dataType = _const_js__WEBPACK_IMPORTED_MODULE_2__["DataType"].COMMENTS, id = null}) {
    this._store = store;
    if (Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["isOnline"])()) {
      return this.getData(dataUrl, dataType)
        .then((data) => {
          // В зависимости от типа данных обрабатываем их и передаем в хранилище
          const adaptedToServer = dataType === _const_js__WEBPACK_IMPORTED_MODULE_2__["DataType"].FILMS ? [...data].map(this._adaptToServer) : data;
          const items = createStoreStructure(adaptedToServer);
          this._store.setItems(items, dataType, id);
          return {data, isCached: true};
        });
    }

    // если офлайн, возвращаем данные из хранилища
    const storeData = Object.values(this._store.getItems(dataType, id));
    const adaptedStoreData = dataType === _const_js__WEBPACK_IMPORTED_MODULE_2__["DataType"].FILMS
      ? [...storeData].map((item) => this._adaptToClient(item))
      : storeData;
    //флаг, если нет закешированных данных (нужно для комментариев)
    const isCached = storeData.length > 0;
    return Promise.resolve({data: adaptedStoreData, isCached});
  }

  updateDataToCache(data) {
    if (Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["isOnline"])()) {
      return this.updateData(data)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.filmInfo.id, this._adaptToServer(updatedFilm), _const_js__WEBPACK_IMPORTED_MODULE_2__["DataType"].FILMS);
          return updatedFilm;
        });
    }

    this._store.setItem(data.filmInfo.id, this._adaptToServer(Object.assign({}, data)), _const_js__WEBPACK_IMPORTED_MODULE_2__["DataType"].FILMS);

    return Promise.resolve(data);
  }

  syncToCache() {
    if (Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["isOnline"])()) {
      const storeFilms = Object.values(this._store.getItems());
      return this.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const updatedFilms = response.updated;

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([ ...updatedFilms]);
          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}


/***/ }),

/***/ "./src/model/points.js":
/*!*****************************!*\
  !*** ./src/model/points.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Points; });
/* harmony import */ var _abstract_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-model.js */ "./src/model/abstract-model.js");


class Points extends _abstract_model_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._points = [];
  }

  setItems(updateType, points) {
    this._points = points.slice();
    this._notify(updateType, this._points);
  }

  getItems() {
    return this._points;
  }

  updatePoint(updateType, update) {
    this._points = [...this._points];
    //const updatedPoint = update.id ? this._adaptPointToClient(update) : update;
    const index = this._points.findIndex((point) => point.id === update.id);
    if (index !== -1) {
      this._points.splice(index, 1, update);
    }
    if (updateType) {
      this._notify(updateType, update);
    }
  }
}


/***/ }),

/***/ "./src/presenter/board.js":
/*!********************************!*\
  !*** ./src/presenter/board.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoardPresenter; });
/* harmony import */ var _info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info.js */ "./src/presenter/info.js");
/* harmony import */ var _point_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point.js */ "./src/presenter/point.js");
/* harmony import */ var _point_full_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./point-full.js */ "./src/presenter/point-full.js");
/* harmony import */ var _view_menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/menu.js */ "./src/view/menu.js");
/* harmony import */ var _view_filters_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/filters.js */ "./src/view/filters.js");
/* harmony import */ var _view_loading_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/loading.js */ "./src/view/loading.js");
/* harmony import */ var _view_no_points_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/no-points.js */ "./src/view/no-points.js");
/* harmony import */ var _view_sort_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/sort.js */ "./src/view/sort.js");
/* harmony import */ var _view_pointsContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../view/pointsContainer */ "./src/view/pointsContainer.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _utils_dates_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/dates.js */ "./src/utils/dates.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../const */ "./src/const.js");















class BoardPresenter {
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
    this._menuComponent = new _view_menu_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._filtersComponent = new _view_filters_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

    // components
    this._loadingComponent = new _view_loading_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this._noPointsComponent = new _view_no_points_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this._pointsContainerComponent = new _view_pointsContainer__WEBPACK_IMPORTED_MODULE_8__["default"]();
    this._sortComponent = null;

    // options
    this._isLoading = true;
    this._currentSortType = _const__WEBPACK_IMPORTED_MODULE_12__["SortType"].DAY;

    // handlers
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePointsListClick = this._handlePointsListClick.bind(this);
    this._handleSortButtonsClick = this._handleSortButtonsClick.bind(this);
  }

  init() {
    this._render();
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _getPoints() {
    const points = this._pointsModel.getItems().slice();
    switch (this._currentSortType) {
      case _const__WEBPACK_IMPORTED_MODULE_12__["SortType"].DATE:
        points.sort(_utils_dates_js__WEBPACK_IMPORTED_MODULE_11__["sortByDate"]);
        break;
      case _const__WEBPACK_IMPORTED_MODULE_12__["SortType"].TIME:
        points.sort(_utils_dates_js__WEBPACK_IMPORTED_MODULE_11__["sortByTime"]);
        break;
      case _const__WEBPACK_IMPORTED_MODULE_12__["SortType"].PRICE:
        points.sort(_utils_common_js__WEBPACK_IMPORTED_MODULE_10__["sortByPrice"]);
        break;
    }
    return points;
  }

  // методы рендера
  _render() {
    const points = this._getPoints();
    this._renderInfo(this._headerContainer, this._pointsModel.getItems().slice());
    this._renderMenu();
    this._renderFilters();
    this._renderSort();
    if (this._isLoading) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["render"])(this._eventsContainer, this._loadingComponent);
      return;
    }
    if (points.length < 0) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["render"])(this._eventsContainer, this._noPointsComponent);
      return;
    }

    this._renderPointsContainer();
    this._renderPoints(points);
  }

  _renderInfo(headerContainer, points) {
    this._infoPresenter = new _info_js__WEBPACK_IMPORTED_MODULE_0__["default"](headerContainer, points);
    this._infoPresenter.init();
  }

  _renderMenu() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["render"])(this._menuContainer, this._menuComponent);
  }

  _renderFilters() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["render"])(this._filterContainer, this._filtersComponent);
  }

  _renderSort() {
    if (this._sortComponent) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["remove"])(this._sortComponent);
      this._sortComponent = null;
    }
    this._sortComponent = new _view_sort_js__WEBPACK_IMPORTED_MODULE_7__["default"](this._currentSortType);
    this._sortComponent.setSortButtonsClickHandler(this._handleSortButtonsClick);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["render"])(this._eventsContainer, this._sortComponent);
  }

  _renderPointsContainer() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["render"])(this._eventsContainer, this._pointsContainerComponent);
    this._pointsContainerComponent.setPointClickHandler(this._handlePointsListClick);
  }

  _renderPoints(points) {
    const pointsContainer = this._pointsContainerComponent.getElement();
    points.forEach((point) => {
      this._renderPoint(pointsContainer, point);
    });
  }

  _renderPoint(container, point) {
    const pointPresenter = new _point_js__WEBPACK_IMPORTED_MODULE_1__["default"](container, this._handleViewAction);
    pointPresenter.init(point);
    this._pointPresentersList.set(point.id, pointPresenter);
  }

  // методы очистки и обновления
  _clear() {
    this._pointPresentersList
      .forEach((point) => point.destroy());
    this._pointPresentersList.clear();
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["remove"])(this._sortComponent);
    this._infoPresenter.destroy();
    this._infoPresenter = null;
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
      case _const__WEBPACK_IMPORTED_MODULE_12__["UpdateType"].INIT:
        this._isLoading = false,
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_9__["remove"])(this._loadingComponent);
        this._render(data);
        break;
      case _const__WEBPACK_IMPORTED_MODULE_12__["UpdateType"].PATCH:
        this._rerenderPoint(data);
        break;
    }
  }

  _handlePointsListClick(clickedPointID) {
    const pointPresenter = this._pointPresentersList.get(clickedPointID);
    const point = {...pointPresenter.getPoint()};

    if (this._pointFullPresenter) {
      const openedPointID = this._pointFullPresenter.getPoint().id;
      this._pointFullPresenter.destroy();
      this._pointFullPresenter = null;
      if (openedPointID === clickedPointID) {
        return;
      }
    }
    // открываем карточку
    this._pointFullPresenter = new _point_full_js__WEBPACK_IMPORTED_MODULE_2__["default"](this._pointsContainerComponent);
    this._pointFullPresenter.init(point, pointPresenter);
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


/***/ }),

/***/ "./src/presenter/info.js":
/*!*******************************!*\
  !*** ./src/presenter/info.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InfoPresenter; });
/* harmony import */ var _view_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/info.js */ "./src/view/info.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");




class InfoPresenter {
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
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(this._component);
  }

  _render() {
    const oldComponent = this._component;
    this._component = new _view_info_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._points);

    if (oldComponent !== null) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(oldComponent);
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["render"])(this._container, this._component, _const__WEBPACK_IMPORTED_MODULE_2__["RenderPosition"].START);
  }
}



/***/ }),

/***/ "./src/presenter/point-full.js":
/*!*************************************!*\
  !*** ./src/presenter/point-full.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointFullPresenter; });
/* harmony import */ var _view_point_full_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/point-full.js */ "./src/view/point-full.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");



class PointFullPresenter {
  constructor(containerComponent) {
    this._container = containerComponent.getElement();
    this._component = null;
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(point, pointPresenter) {
    this._point = point;
    this._pointPresenter = pointPresenter;
    const oldComponent = this._component;

    this._component = new _view_point_full_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._point);
    document.addEventListener('keydown', this._handleEscKeyDown);

    if (oldComponent === null) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["replace"])(this._pointPresenter.getComponent(), this._component);
      return;
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["replace"])(oldComponent, this._component);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(oldComponent);
  }

  getPoint() {
    return this._point;
  }

  getComponent() {
    return this._component;
  }

  destroy() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["replace"])(this._component, this._pointPresenter.getComponent());
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(this._component);
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.destroy();
    }
  }
}


/***/ }),

/***/ "./src/presenter/point.js":
/*!********************************!*\
  !*** ./src/presenter/point.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointPresenter; });
/* harmony import */ var _view_point_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/point.js */ "./src/view/point.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");




class PointPresenter {
  constructor(container, handlePointChange) {
    this._container = container;
    this._component = null;
    this._changeData = handlePointChange;
    this._handleFavoriteButtonClick = this._handleFavoriteButtonClick.bind(this);
  }

  init(point) {
    this._point = point;
    const oldComponent = this._component;
    this._component = new _view_point_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._point);
    this._component.setFavoriteButtonClick(this._handleFavoriteButtonClick);

    if (oldComponent === null) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["render"])(this._container, this._component);
      return;
    }

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["replace"])(oldComponent, this._component);
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(oldComponent);
  }

  getPoint() {
    return this._point;
  }

  getComponent() {
    return this._component;
  }

  destroy() {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_1__["remove"])(this._component);
  }

  _handleFavoriteButtonClick(isFavoriteFlag) {
    this._changeData(_const_js__WEBPACK_IMPORTED_MODULE_2__["UpdateType"].PATCH, {...this._point, isFavorite: !isFavoriteFlag});
  }
}


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: isOnline, sortByPrice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOnline", function() { return isOnline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByPrice", function() { return sortByPrice; });
// проверяем доступ к сети
const isOnline = () => {
  return window.navigator.onLine;
};

// Сортируем по цене
const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


/***/ }),

/***/ "./src/utils/dates.js":
/*!****************************!*\
  !*** ./src/utils/dates.js ***!
  \****************************/
/*! exports provided: getDateDiff, humanizeDate, humanizeDuration, isDateInRange, sortByDate, sortByTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateDiff", function() { return getDateDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizeDate", function() { return humanizeDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizeDuration", function() { return humanizeDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDateInRange", function() { return isDateInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByDate", function() { return sortByDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByTime", function() { return sortByTime; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/isSameOrBefore */ "./node_modules/dayjs/plugin/isSameOrBefore.js");
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");




const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

const formatTwoDigits = (number) => number < 10 ? `0${number}` : number;

const getDateDiff = (dateFrom, dateTo, diffOnly = false) => {
  const diff =  dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom), 'minute', true);
  if (diffOnly) {
    return Math.round(diff);
  }
  const days = formatTwoDigits(Math.trunc(diff / 1440));
  const hours = formatTwoDigits(Math.trunc(diff / 60));
  const minutes = formatTwoDigits(Math.round(diff % 60));
  if (diff <= MINUTES_IN_HOUR) {
    return `${formatTwoDigits(diff)}M`;
  } else if (diff <= MINUTES_IN_DAY) {
    return `${hours}H ${minutes}M`;
  }

  return `${days}D ${hours}H ${minutes}M`;
};
const humanizeDate = (date, formatType) => {
  switch (formatType) {
    case _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].DIGITS:
      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY-MM-DD');
    case _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].SHORT:
      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('MMM DD');
    case _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].FULL:
      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('YYYY/MM/DD HH:mm');
    case _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].MIN:
      return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format('HH:mm');
  }
};

// Переводим минуты в часы и минуты
const humanizeDuration = (duration, {asObject = false} = {}) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (asObject) {
    return {
      hours,
      minutes,
    };
  }
  return `${hours}h ${minutes}m`;
};

// Проверяем есть ли дата в диапазоне
const isDateInRange = (currentDate, dateFrom) => {
  dayjs__WEBPACK_IMPORTED_MODULE_0___default.a.extend(dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1___default.a);
  return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).isSameOrBefore(currentDate);
};

// Сортируем по дате
const sortByDate = (pointA, pointB) => {
  const datePointA = pointA.dateFrom;
  const datePointB = pointB.dateFrom;
  return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(datePointB).diff(datePointA);
};

// Сортируем по продолжительности
const sortByTime = (pointA, pointB) => {
  const durationPointA = getDateDiff(pointA.dateFrom, pointA.dateTo, true);
  const durationPointB = getDateDiff(pointB.dateFrom, pointB.dateTo, true);
  return durationPointB - durationPointA;
};

// Получаем дату конца периода
// export const getDateFrom = (period) => {
//   switch (period) {
//     case DatePeriod.TODAY:
//       return dayjs().toDate();
//     case DatePeriod.WEEK:
//       return dayjs().subtract(DAYS_WEEK, 'day').toDate();
//     case DatePeriod.MONTH:
//       return dayjs().subtract(1, 'month').toDate();
//     case DatePeriod.YEAR:
//       return dayjs().subtract(1, 'year').toDate();
//   }
// };


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: createDomElement, render, remove, replace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDomElement", function() { return createDomElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony import */ var _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



// создание DOM элемента
const createDomElement = (template) => {
  const templateContainer = document.createElement('template');
  templateContainer.innerHTML = template;
  return templateContainer.content.firstElementChild;
};

// рендер компонента
const render = (container, element, place) => {
  if (container instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    container = container.getElement();
  }

  if (element instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    element = element.getElement();
  }

  switch (place) {
    case _const_js__WEBPACK_IMPORTED_MODULE_1__["RenderPosition"].START:
      container.prepend(element);
      break;
    case _const_js__WEBPACK_IMPORTED_MODULE_1__["RenderPosition"].END:
    default:
      container.append(element);
  }
};

// удаление компонента
const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can remove components only');
  }
  component.getElement().remove();
  component.removeElement();
};

// замена элемента
const replace = (oldChild, newChild) => {
  if (oldChild instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;
  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};



/***/ }),

/***/ "./src/view/abstract.js":
/*!******************************!*\
  !*** ./src/view/abstract.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Abstract; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


const ANIMATION_DURATION = 600;

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract class, only concrete one.');
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createDomElement"])(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(element, callback) {
    element.style.animation = `shake ${ANIMATION_DURATION / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      callback();
    }, ANIMATION_DURATION);
  }
}


/***/ }),

/***/ "./src/view/filters.js":
/*!*****************************!*\
  !*** ./src/view/filters.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filters; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createFiltersElement = () => {
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

class Filters extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createFiltersElement();
  }
}


/***/ }),

/***/ "./src/view/info.js":
/*!**************************!*\
  !*** ./src/view/info.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Info; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _utils_dates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dates.js */ "./src/utils/dates.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");




const createInfoElement = (points) => {
  // Создаем список точек маршрута
  // без следующих друг за другом повторений
  const createRoute = () => {
    const destins = [];
    for (let i = 1; i < points.length; i++) {
      if (points[i].destination.name !== points[i - 1].destination.name) {
        destins.push(points[i].destination.name);
      }
    }
    destins.unshift(points[0].destination.name);
    return destins.join(' - ');
  };

  const totalPrice = points.reduce((acc, point) => {
    return acc + point.basePrice + point.offers.reduce((sum, offer) => sum + offer.price, 0);
  }, 0);
  const startDate = Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(points[0].dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].SHORT);
  const endDate = Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(points[points.length - 1].dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].SHORT);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createRoute()}</h1>

    <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};

class Info extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoElement(this._points);
  }
}


/***/ }),

/***/ "./src/view/loading.js":
/*!*****************************!*\
  !*** ./src/view/loading.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Loading; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createLoadingElement = () => '<p class="trip-events__msg">Loading...</p>';

class Loading extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingElement();
  }
}


/***/ }),

/***/ "./src/view/menu.js":
/*!**************************!*\
  !*** ./src/view/menu.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createMenuElement = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;
};

class Menu extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createMenuElement();
  }
}


/***/ }),

/***/ "./src/view/no-points.js":
/*!*******************************!*\
  !*** ./src/view/no-points.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoPoints; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createNoPointsElement = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

class NoPoints extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createNoPointsElement();
  }
}


/***/ }),

/***/ "./src/view/point-full.js":
/*!********************************!*\
  !*** ./src/view/point-full.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointFull; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _utils_dates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dates.js */ "./src/utils/dates.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");




const createPointFullElement = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    offers,
    type,
  } = point;

  const renderOffers = (offers) => {
    if (offers.length === 0) {
      return '';
    }

    const offerElements = offers.reduce((acc, offer, id) => {
      const getIdName = () => `event-offer-${offer.title.split(' ').pop()}-${id}`;
      return acc + `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getIdName()}" type="checkbox" name="event-offer-${getIdName()}" checked>
  <label class="event__offer-label" for="event-offer-${getIdName()}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>
`;
    }, '');

    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offerElements}
    </div>
  </section>`;
  };

  const renderDestination = (destination) => {
    if (!destination.name) {
      return '';
    }
    const destinationPictures = destination.pictures.reduce((acc, picture) => {
      return acc + `<img class="event__photo" src="${picture.src}" alt="${picture.description}">
`;
    }, '');
    const renderPictures = () => `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${destinationPictures}
  </div>
</div>`;

    return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description}</p>
  ${renderPictures()}
</section>`;
  };

  return `<li class="trip-events__item" data-id="${id}">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].FULL)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].FULL)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${renderOffers(offers)}

      ${renderDestination(destination)}
    </section>
  </form>
</li>`;
};

class PointFull extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointFullElement(this._point);
  }
}


/***/ }),

/***/ "./src/view/point.js":
/*!***************************!*\
  !*** ./src/view/point.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _utils_dates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dates.js */ "./src/utils/dates.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");




const FAVORITE_BUTTON_CLASS = 'event__favorite-btn';
const ACTIVE_BUTTON_CLASS = 'event__favorite-btn--active';

const createPointElement = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    isFavorite,
    offers,
    type,
  } = point;

  const formatDateTimeAttribute = (date, short = false) => {
    return short
      ? `${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(date, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].DIGITS)}`
      : `${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(date, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].DIGITS)}T${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(date, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].MIN)}`;
  };

  const isFavoriteClass = () => isFavorite ? ACTIVE_BUTTON_CLASS : '';

  const renderOffers = () => {
    if (offers.length === 0) {
      return '';
    }

    const offersElements = offers.reduce((acc, offer) => {
      return acc + `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>
`;}, '');

    return `<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
  ${offersElements}
</ul>`;
  };

  return `<li class="trip-events__item" data-id="${id}">
  <div class="event">
    <time class="event__date" datetime="${formatDateTimeAttribute(dateFrom, true)}">${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].SHORT)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatDateTimeAttribute(dateFrom)}">${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].MIN)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatDateTimeAttribute(dateTo)}">${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_2__["DateType"].MIN)}</time>
      </p>
      <p class="event__duration">${Object(_utils_dates_js__WEBPACK_IMPORTED_MODULE_1__["getDateDiff"])(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    ${renderOffers()}
    <button class="event__favorite-btn ${isFavoriteClass()}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

class Point extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(point) {
    super();
    this._point = point;
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createPointElement(this._point);
  }

  setFavoriteButtonClick(callback) {
    this._callback.favoriteButtonClick = callback;
    this.getElement()
      .querySelector(`.${FAVORITE_BUTTON_CLASS}`)
      .addEventListener('click', this._favoriteButtonClickHandler);
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    const button = target.closest(`.${FAVORITE_BUTTON_CLASS}`);
    if (!button) {
      return;
    }

    this._callback.favoriteButtonClick(button.classList.contains(ACTIVE_BUTTON_CLASS));
  }
}


/***/ }),

/***/ "./src/view/pointsContainer.js":
/*!*************************************!*\
  !*** ./src/view/pointsContainer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointsContainer; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");

const EDIT_BUTTON_CLASS = 'event__rollup-btn';
const POINT_CLASS = 'trip-events__item';
const createPointsContainerElement = () => '<ul class="trip-events__list"></ul>';

class PointsContainer extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._pointClickHandler = this._pointClickHandler.bind(this);
  }

  getTemplate() {
    return createPointsContainerElement();
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().addEventListener('click', this._pointClickHandler);
  }

  removePointClickHandler() {
    this.getElement().removeEventListener('click', this._pointClickHandler);
  }

  _pointClickHandler(evt) {
    const target = evt.target;
    if (!target.classList.contains(EDIT_BUTTON_CLASS)) {
      return;
    }
    evt.preventDefault();
    const pointID = target.closest(`.${POINT_CLASS}`).dataset.id;
    this._callback.pointClick(pointID);
  }
}


/***/ }),

/***/ "./src/view/sort.js":
/*!**************************!*\
  !*** ./src/view/sort.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const SORT_INPUT_CLASS = 'trip-sort__input';

const createSortElement = (sortType) => {
  const isChecked = (currentSortType) => sortType === currentSortType ? 'checked' : '';

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${isChecked(_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].DAY)}>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${isChecked(_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].TIME)}>
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${isChecked(_const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].PRICE)}>
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
};

class Sort extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._sortButtonsClickHandler = this._sortButtonsClickHandler.bind(this);
  }

  getTemplate() {
    return createSortElement(this._sortType);
  }

  setSortButtonsClickHandler(callback) {
    this._callback.sortButtonsClick = callback;
    this.getElement()
      .addEventListener('click', this._sortButtonsClickHandler);
  }

  _sortButtonsClickHandler(evt) {
    const target = evt.target;

    if (!target.classList.contains(SORT_INPUT_CLASS)) {
      return;
    }
    evt.preventDefault();
    this._callback.sortButtonsClick(target.value);
  }
}



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map