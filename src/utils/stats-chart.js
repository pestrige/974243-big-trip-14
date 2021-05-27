import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { humanizeDuration } from '../utils/dates.js';

const BAR_HEIGHT = 55;

const ChartSettings = {
  TYPE: 'horizontalBar',
  MAIN_COLOR: '#ffffff',
  ACCENT_COLOR: '#000000',
  LABEL_FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  PADDING: 5,
  THICKNESS: 44,
  MIN_BAR_LENGTH: 70,
  MONEY_CHART_FORMATTER: (val) => `€ ${val}`,
  TYPE_CHART_FORMATTER: (val) => `${val}x`,
  TIME_CHART_FORMATTER: (val) => `${humanizeDuration(val)}`,
};

const ChartNames = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME-SPEND',
};

const getChartSettings = (labels, data, formatter, labelName) => {
  return {
    plugins: [ChartDataLabels],
    type: ChartSettings.TYPE,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ChartSettings.MAIN_COLOR,
        hoverBackgroundColor: ChartSettings.MAIN_COLOR,
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: ChartSettings.LABEL_FONT_SIZE,
          },
          color: ChartSettings.ACCENT_COLOR,
          anchor: 'end',
          align: 'start',
          formatter,
        },
      },
      title: {
        display: true,
        text: labelName,
        fontColor: ChartSettings.ACCENT_COLOR,
        fontSize: ChartSettings.TITLE_FONT_SIZE,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSettings.ACCENT_COLOR,
            padding: ChartSettings.PADDING,
            fontSize: ChartSettings.LABEL_FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: ChartSettings.BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: ChartSettings.MIN_BAR_LENGTH,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  };
};

export const renderMoneyChart = (moneyCtx, moneyStats) => {
  const labels = new Array();
  const data = new Array();
  moneyStats.forEach(([name, count]) => {
    labels.push(name.toUpperCase());
    data.push(count);
  });
  moneyCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(
    moneyCtx,
    getChartSettings(labels, data, ChartSettings.MONEY_CHART_FORMATTER, ChartNames.MONEY),
  );
};

export const renderTypeChart = (typeCtx, typeStats) => {
  const labels = new Array();
  const data = new Array();
  typeStats.forEach(([name, count]) => {
    labels.push(name.toUpperCase());
    data.push(count);
  });
  typeCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(
    typeCtx,
    getChartSettings(labels, data, ChartSettings.TYPE_CHART_FORMATTER, ChartNames.TYPE),
  );
};

export const renderTimeChart = (typeCtx, timeStats) => {
  const labels = new Array();
  const data = new Array();
  timeStats.forEach(([name, count]) => {
    labels.push(name.toUpperCase());
    data.push(count);
  });
  typeCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(
    typeCtx,
    getChartSettings(labels, data, ChartSettings.TIME_CHART_FORMATTER, ChartNames.TIME),
  );
};
