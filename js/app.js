import {map} from './map.js';
import {formAd} from './form/ad-form.js';
import {formFilter} from './form/filter-form.js';
import {ErrorMessage} from './utils/error-message.js';
import './slider.js';
import {dataSorter} from './utils/data-sorter.js';

class App {
  constructor() {
    this.addAnnouncementForm = document.querySelector('.ad-form');
    this.filterAnnouencementsForm = document.querySelector('.map__filters');
    this.submitButton = document.querySelector('.ad-form__submit');
    this.resetButton = document.querySelector('.ad-form__reset');
    this.hasLoadedData = false;
  }

  disableAddAnnouncementForm() {
    formAd.disable('.ad-form');
  }

  disableFilterAnnouncemensForm() {
    formFilter.disable('.map__filters');
  }

  activateAddAnnouncementForm() {
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

  sendAnnouncementToServer(evt) {
    evt.preventDefault();
    formAd.submitHandler(evt);
  }

  getDataFromServer() {
    return fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json());
  }

  fillMapbySimilarAnnouncements(data) {
    //map.setData(data);
    map.setDefaultData(data);
    map.fillByPoints();
  }

  showLoadErrorMessage(errorText) {
    const errorMessage = new ErrorMessage('map', errorText);
    errorMessage.show();
  }

  addFilterAnnouncemensForm(dataFromServer) {
    dataSorter.getDataFromServer(dataFromServer);
    dataSorter.setFormChangeListener();
  }

  sortAnnouencements() {
    dataSorter.sortAll();
  }

  reset() {
    formAd.reset();
    formFilter.reset();
    map.reset();
  }
}

export const app = new App();
