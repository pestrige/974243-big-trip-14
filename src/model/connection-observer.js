import AbstractModel from './abstract-model.js';
import { showToast } from '../utils/toast.js';
import { ConnectionStatus } from '../const.js';

export default class ConnectionObserver extends AbstractModel {
  constructor() {
    super();
  }

  init(provider) {
    window.addEventListener(ConnectionStatus.ONLINE, () => {
      document.title = document.title.replace(' [offline]', '');
      this._notify(ConnectionStatus.ONLINE);
      provider.syncCached();
    });

    window.addEventListener(ConnectionStatus.OFFLINE, () => {
      document.title += ` ${ConnectionStatus.OFFLINE}`;
      showToast('Internet connection is lost');
      this._notify(ConnectionStatus.OFFLINE);
    });
  }
}
