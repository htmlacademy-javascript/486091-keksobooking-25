import {map} from './map.js';
import {formAd} from './form/ad-form.js';
import {formFilter} from './form/filter-form.js';
import {ErrorMessage} from './utils/error-message.js';
import './slider.js';
import {dataSorter} from './utils/data-sorter.js';

class App {
  constructor() {
    this.advertisementForm = document.querySelector('.ad-form');
    this.resetButton = document.querySelector('.ad-form__reset');
  }

  disableAdvertisementForm() {
    formAd.disable('.ad-form');
  }

  disableFilterForm() {
    formFilter.disable('.map__filters');
  }

  activateAdvertisementForm() {
    formAd.activate('.ad-form');
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

  sendAdvertisementToServer(evt) {
    evt.preventDefault();
    formAd.submitHandler(evt);
  }

  getDataFromServer() {
    return fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json());
  }

  fillMapBySimilarAdvertisements(data) {
    map.setDefaultData(data);
    map.fillByPoints();
  }

  showLoadErrorMessage(errorText) {
    const errorMessage = new ErrorMessage('map', errorText);
    errorMessage.show();
  }

  sortAdvertisements(dataFromServer) {
    dataSorter.getDataFromServer(dataFromServer);
    dataSorter.setFormChangeListener();
  }

  reset() {
    formAd.reset();
    formFilter.reset();
    map.reset();
  }
}

export const app = new App();
