// проверяем доступ к сети
export const isOnline = () => {
  return window.navigator.onLine;
};

// Сортируем по цене
export const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
