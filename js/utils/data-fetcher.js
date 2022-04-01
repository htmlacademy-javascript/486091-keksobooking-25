import {
  map
} from '../map.js';
import {
  ErrorMessage
} from './error-message.js';
import {
  dataSorter
} from './data-sorter.js';

class DataFetcher {
  constructor() {
    this.getDataFromServer();
  }

  getDataFromServer() { // Получи данные объявлений с сервера
    fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json())
      .then((announcements) => {
        dataSorter.getDataFromServer(announcements);
        dataSorter.setFormChangeListener();
        map.setData(announcements);
        map.fillByPoints();
      })
      .catch((errorText) => {
        const errorMessage = new ErrorMessage('map', errorText);
        errorMessage.show();
      });
  }

  getData() {
    return this.data;
  }
}

const dataFetcher = new DataFetcher();

dataFetcher.getData();

export {
  dataFetcher
};
