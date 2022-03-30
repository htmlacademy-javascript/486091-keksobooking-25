import {
  formAd
} from './form/ad-form.js';
import {
  formFilter
} from './form/filter-form.js';
import {
  map
} from './map.js';
import {
  slider
} from './slider.js';
import {
  ErrorMessage
} from './utils/error-message.js';

let dataFromServer = []

fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((announcements) => {
    dataFromServer = announcements;
    map.setData(announcements);
    map.fillByPoints();
  })
  .catch((errorText) => {
    const errorMessage = new ErrorMessage('map', errorText);
    errorMessage.show();
  });


formFilter.element.addEventListener('change', (evt) => {
  formFilter.getValue();
  //console.log(dataFromServer)
  let filteredData = dataFromServer;

  if (formFilter.type) {
    console.log(formFilter.type)
    filteredData = filteredData.filter((obj) => {
      if (obj.offer.type === formFilter.type) {
        return true;
      } else if (formFilter.type === 'any') {
        return true;
      }
    })
  }


  if (formFilter.price) {
    console.log(typeof formFilter.price)
    filteredData = filteredData.filter((obj) => {
      if (formFilter.price === 'any') {
        return true;
      } else if (formFilter.price === 'middle') {
        if (obj.offer.price >= 10000 && obj.offer.price <= 50000) {
          return true;
        }
      } else if (formFilter.price === 'low') {
        if (obj.offer.price < 10000) {
          return true;
        }
      } else if (formFilter.price === 'high') {
        if (obj.offer.price > 50000) {
          return true;
        }
      }
      return false
    })
  }

  if (formFilter.rooms) {
    console.log(typeof formFilter.rooms);

    filteredData = filteredData.filter((obj) => {
      if (formFilter.rooms === 'any') {
        return true;
      } else if (obj.offer.rooms === Number(formFilter.rooms)) {
        console.log(obj.offer.rooms)
        return true;
      }
      return false;
    })
  }

  if (formFilter.guests) {
    console.log(typeof formFilter.guests)

    filteredData = filteredData.filter((obj) => {
      if (formFilter.guests === 'any') {
        return true;
      } else if (obj.offer.guests === Number(formFilter.guests)) {
        console.log(obj.offer.guests)
        return true;
      }
      return false;
    })
  }

  if (formFilter.features.length > 0) {

    filteredData = filteredData.filter((obj) => {
      if (obj.offer.features && obj.offer.features.length > 0) {
        let a = formFilter.features.sort().join();
        console.log(a)
        let b = obj.offer.features.sort().join();
        console.log(b)
        return true;
      }
      return false;
    })
  }
  console.log(filteredData)

})
