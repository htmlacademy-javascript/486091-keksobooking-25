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
import {dataSorter} from "./utils/data-sorter.js";
import {dataFetcher} from "./utils/data-fetcher.js";

/*
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


*/
