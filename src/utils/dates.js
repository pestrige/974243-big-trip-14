import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DateType } from '../const.js';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

const formatTwoDigits = (number) => number < 10 ? `0${number}` : number;

export const getDateDiff = (dateFrom, dateTo, diffOnly = false) => {
  const diff =  dayjs(dateTo).diff(dayjs(dateFrom), 'minute', true);
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
export const humanizeDate = (date, formatType) => {
  switch (formatType) {
    case DateType.DIGITS:
      return dayjs(date).format('YYYY-MM-DD');
    case DateType.SHORT:
      return dayjs(date).format('MMM DD');
    case DateType.FULL:
      return dayjs(date).format('YYYY/MM/DD HH:mm');
    case DateType.MIN:
      return dayjs(date).format('HH:mm');
  }
};

// Переводим минуты в часы и минуты
export const humanizeDuration = (duration, {asObject = false} = {}) => {
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
export const isDateInRange = (currentDate, dateFrom) => {
  dayjs.extend(isSameOrBefore);
  return dayjs(dateFrom).isSameOrBefore(currentDate);
};

// Сортируем по дате
export const sortByDate = (pointA, pointB) => {
  const datePointA = pointA.dateFrom;
  const datePointB = pointB.dateFrom;
  return dayjs(datePointB).diff(datePointA);
};

// Сортируем по продолжительности
export const sortByTime = (pointA, pointB) => {
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
