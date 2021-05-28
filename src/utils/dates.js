import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DateType, FilterType } from '../const.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

const formatTwoDigits = (number) => number < 10 ? `0${number}` : number;

export const getDateDiff = (dateFrom, dateTo, diffOnly = false) => {
  const diff =  dayjs(dateTo).diff(dayjs(dateFrom), 'minute', true);
  if (diffOnly) {
    return Math.round(diff);
  }
  return humanizeDuration(diff);
};

export const humanizeDate = (date, formatType) => {
  switch (formatType) {
    case DateType.DIGITS:
      return dayjs(date).format('YYYY-MM-DD');
    case DateType.SHORT:
      return dayjs(date).format('MMM DD');
    case DateType.FULL:
      return dayjs(date).format('DD/MM/YYYY HH:mm');
    case DateType.MIN:
      return dayjs(date).format('HH:mm');
  }
};

// Переводим минуты в дни, часы и минуты
export const humanizeDuration = (duration) => {
  const days = formatTwoDigits(Math.trunc(duration / 1440));
  const hours = formatTwoDigits(Math.trunc(duration / 60));
  const minutes = formatTwoDigits(Math.round(duration % 60));
  if (duration <= MINUTES_IN_HOUR) {
    return `${formatTwoDigits(duration)}M`;
  } else if (duration <= MINUTES_IN_DAY) {
    return `${hours}H ${minutes}M`;
  }

  return `${days}D ${hours}H ${minutes}M`;
};

// Проверяем есть ли дата в диапазоне
export const isDateInRange = (currentDate, dateFrom) => {
  dayjs.extend(isSameOrBefore);
  return dayjs(dateFrom).isSameOrBefore(currentDate);
};

// Сортируем по дате
export const sortByDate = (pointA, pointB) => {
  const datePointA = pointA.dateFrom;
  const datePointB = pointB.dateFrom;
  return dayjs(datePointA).diff(datePointB);
};

// Сортируем по продолжительности
export const sortByTime = (pointA, pointB) => {
  const durationPointA = getDateDiff(pointA.dateFrom, pointA.dateTo, true);
  const durationPointB = getDateDiff(pointB.dateFrom, pointB.dateTo, true);
  return durationPointB - durationPointA;
};

// Получаем количество маршрутов по ключу
export const getFilteredPointsCounts = (points) => {
  dayjs.extend(isSameOrBefore);
  const filtersCount = {
    future: 0,
    past: 0,
  };

  points.forEach((point) => {
    dayjs().isSameOrBefore(point.dateFrom)
      ? filtersCount.future ++
      : filtersCount.past ++;
  });
  return {everything: points.length, ...filtersCount};
};

// Список отфиотрованных массивов точек маршрутов
export const filter = {
  [FilterType.ALL]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter(({dateFrom}) => dayjs().isSameOrBefore(dateFrom)),
  [FilterType.PAST]: (points) => points.filter(({dateFrom}) => !dayjs().isSameOrBefore(dateFrom)),
};

// Календарь
export const createDatePicker = (container, defaultDate, onChangeCallback, minDate = null) => {
  return flatpickr(
    container,
    {
      dateFormat: 'd/m/Y H:i',
      defaultDate,
      minDate,
      enableTime: true,
      'time_24hr': true,
      onChange: onChangeCallback,
    },
  );
};
