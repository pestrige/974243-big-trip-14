import AbstractView from './abstract.js';
import { renderMoneyChart, renderTypeChart, renderTimeChart } from '../utils/stats-chart.js';
import { getDateDiff } from '../utils/dates.js';

const getStatsMap = (points) => {
  const typesMap = new Map();
  const moneyMap = new Map();
  const timeMap = new Map();
  const getSorted = (map) => [...map.entries()].sort((a, b) => b[1] - a[1]);

  points.forEach((point) => {
    //moneyMap
    const moneyCounter = (moneyMap.get(point.type) || 0) + point.basePrice;
    moneyMap.set(point.type, moneyCounter);

    // typeMap
    const typeCounter = typesMap.get(point.type) + 1 || 1;
    typesMap.set(point.type, typeCounter);

    // timeMap
    const timeCounter = (timeMap.get(point.type) || 0) + getDateDiff(point.dateFrom, point.dateTo, true);
    timeMap.set(point.type, timeCounter);
  });

  return {
    moneyStats: getSorted(moneyMap),
    typeStats: getSorted(typesMap),
    timeStats: getSorted(timeMap),
  };
};

const createStatsElement = () => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
  <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;

export default class Stats extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
    this._setCharts();
  }

  getTemplate() {
    return createStatsElement();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');
    const StatsMap = getStatsMap(this._points);

    renderMoneyChart(moneyCtx, StatsMap.moneyStats);
    renderTypeChart(typeCtx, StatsMap.typeStats);
    renderTimeChart(timeCtx, StatsMap.timeStats);
  }
}
