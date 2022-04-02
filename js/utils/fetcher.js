import {map} from '../map.js';
import {ErrorMessage} from './error-message.js';
import {dataSorter} from './data-sorter.js';

class Fetcher {
  constructor() {
  this.isLoad = 'dddd';
    //this.getDataFromServer();

    fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json())
      .then((announcements) => {
        dataSorter.getDataFromServer(announcements);
        dataSorter.setFormChangeListener();
        map.setData(announcements);
        map.fillByPoints();
        this.isLoad = 'Конструктор по умолчанию';
      })
      .catch((errorText) => {
        this.isLoad = false;
        const errorMessage = new ErrorMessage('map', errorText);
        errorMessage.show();
      });

  }

  async getDataFromServer() { // Получи данные объявлений с сервера
    fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json())
      .then((announcements) => {
        dataSorter.getDataFromServer(announcements);
        dataSorter.setFormChangeListener();
        map.setData(announcements);
        map.fillByPoints();
        this.isLoad = 'Конструктор по умолчанию';
      })
      .catch((errorText) => {
        this.isLoad = false;
        const errorMessage = new ErrorMessage('map', errorText);
        errorMessage.show();
      });

    return this.isLoad;
  }

  async checkStatus() {
    console.log('Начинаю проверять статус')
    return await this.getDataFromServer();
  }


  getData() {
    return this.data;
  }
}

export const fetcher = new Fetcher();
