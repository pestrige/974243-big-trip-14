export const RenderPosition = {
  START: 'afterbegin',
  END: 'beforeend',
};
export const ApiUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};
export const DataType = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
  OTHER: 'other',
};
export const DateType = {
  DIGITS: 'digits',
  SHORT: 'short',
  FULL: 'full',
};
export const UpdateType = {
  INIT: 'init',
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

export const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

export const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const ActionType = {
  ADD: 'add',
  CANCEL: 'cancel',
  DELETE: 'delete',
  FAVORITE: 'favorite',
  UPDATE: 'update',
};

export const MenuType = {
  POINTS: 'points',
  STATS: 'stats',
};

export const PointState = {
  SAVING: 'saving',
  DELETING: 'deleting',
  ERROR: 'error',
};

export const TargetClass = {
  SUBMIT: 'event__save-btn',
  DELETE: 'event__reset-btn',
};

export const ConnectionStatus = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

export const ErrorMessage = {
  DESTINATION: 'Please choose a destination from the list below',
  SUBMIT_OFFLINE: 'Can\'t add the point in offline',
  SAVING_OFFLINE: 'Can\'t save the point in offline',
  DELETING_OFFLINE: 'Can\'t delete the point in offline',
};
