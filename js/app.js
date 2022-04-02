import {map} from './map.js';
import {fetcher} from './utils/fetcher.js';

class App {
  constructor() {
    this.resetButton = document.querySelector('.ad-form__reset');
    this.hasLoadedData = false;
  }

  disableAddAnnouncementForm() {
    console.log('Форма добавления объявления отключена');
  }

  disableFilterForm() {
    console.log('Форма фильтрации отключена');
  }

  activateAddAnnouncementForm() {
    map.formActivation('.ad-form');
    map.fillFormAddress();
  }

  activateFilterForm() {
    map.formActivation('.map__filters');
  }

   initMap() {
    map.init();
    map.createMainMarker();
    map.SIMILAR_ANNOUNCEMENT_COUNT = 10;
    return map.map._loaded;
  }

  getDataFromServer() {
    return fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json());
  }

  fillMapbySimilarAnnouncements(data) {
    map.setData(data);
    map.fillByPoints();
  }

  async loadAnnouncementsFromServer() {
    fetcher.getDataFromServer();
    console.log(fetcher)
    return fetcher
  }

  async hasLoadedAnnouncementsFromServer() {

    console.log((await fetcher.isLoad));
  }



  checkLoadStatys() {}

  isResetOn() {
    let isReset = false;
    const resetButton = document.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      isReset = true;
      console.log(isReset)
      return isReset;

    })

    return isReset;
  }

  reset() {
    console.log('Приложение сброшено');
  }

  resetOn() {
    return true;
  }

  resetForm() {

  }

  resetSlider() {

  }

  resetMap() {

  }
}

export const app = new App();
