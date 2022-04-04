import {map} from '../map.js';
import {ErrorMessage} from './error-message.js';
import {formFilter} from '../form/filter-form.js';

class DataSorter { // Класс для сортировки массива с объявлениями
  constructor() {
  }

  getDataFromServer(dataFromServer) { // Получи данные объявлений с сервера
    this.dataFromServer = dataFromServer;
  }

  setFormChangeListener() { // Установи обработчик событий для формы фильтрации
    formFilter.element.addEventListener('change', this.debounce(this.sortAll));
  }

  debounce (callback, timeoutDelay = 500) {
    let timeoutId;
    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  }

  addSoredPointsToMap() {
    map.markerGroup.clearLayers();
    map.setData(this.filteredData);
    map.fillByPoints();
  }

  sortAll() { // Отсортируй данные
    formFilter.getValue(); // Получи актуальные значения формы фильтрации
    this.filteredData = this.dataFromServer.slice();
    this.sortByType();
    this.sortByPrice();
    this.sortByRooms();
    this.sortByguests();
    this.sortByFeatures();
    const countOfSortedAnnouncements = this.filteredData.length;
    if (countOfSortedAnnouncements === 0) {
      map.markerGroup.clearLayers();
    } else {
      this.addSoredPointsToMap();
    }
  }

  sortByType() {
    this.filteredData = this.filteredData.filter((obj) => {
      switch (formFilter.type) {
        case 'any':
          return true;
        case obj.offer.type:
          return true;
        default:
          return false;
      }
    });
  }

  sortByPrice() {
    this.filteredData = this.filteredData.filter((obj) => {
      switch (formFilter.price) {
        case 'any':
          return true;
        case 'low':
          return obj.offer.price < 10000;
        case 'middle':
          return obj.offer.price >= 10000 && obj.offer.price <= 50000;
        case 'high':
          return obj.offer.price > 50000;
        default:
          return false;
      }
    });
  }

  sortByRooms() {
    this.filteredData = this.filteredData.filter((obj) => {
      switch (formFilter.rooms) {
        case 'any':
          return true;
        case obj.offer.rooms.toString():
          return true;
        default:
          return false;
      }
    });
  }

  sortByguests() {
    this.filteredData = this.filteredData.filter((obj) => {
      switch (formFilter.guests) {
        case 'any':
          return true;
        case obj.offer.guests.toString():
          return true;
        default:
          return false;
      }
    });
  }

  sortByFeatures() {
    if (formFilter.features.length > 0) {

      this.filteredData = this.filteredData.filter((obj) => {
        if (!obj.offer.features) {
          return false;
        }
        let i = 0;
        formFilter.features.forEach((feature) => {
          if (obj.offer.features.includes(feature)) {
            i = i + 1;
          }
        });

        return i === formFilter.features.length;
      });
    }
  }
}

const dataSorter = new DataSorter();

export {dataSorter};
