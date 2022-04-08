import {map} from '../map/map.js';
import {formAd} from '../form/ad-form.js';
import {formFilter} from '../form/filter-form.js';
import {ErrorMessage} from '../../helpers/error-message.js';
import '../form/slider.js';
import {dataSorter} from '../../helpers/data-sorter.js';

class App { // Абстрактный в философском смысле класс, синхронизирующий работу всех модулей
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
    formFilter.activate('.map__filters');
  }

  initMap() {
    map.init();
    map.createMainMarker();
    return map.map._loaded;
  }

  onAdvertisementFormSubmit(evt) {
    evt.preventDefault();
    formAd.sendAdvertisementToServer(evt);
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

  onResetButtonClick(evt) {
    evt.preventDefault();
    formAd.reset();
    formFilter.reset();
    map.reset();
  }
}

export const app = new App();
