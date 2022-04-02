import './form/ad-form.js';
import './form/filter-form.js';
import './map.js';
import './slider.js';
import './utils/error-message.js';
import './utils/data-sorter.js';
import './utils/fetcher.js';
import {app} from './app.js';
import {map} from "./map.js";
import {ErrorMessage} from "./utils/error-message.js";

app.disableAddAnnouncementForm();
app.disableFilterForm();

if (app.initMap()) {
  app.activateAddAnnouncementForm()
  //app.submitButton.addEventListener('click', app.sendAnnouncementToServer);


  app.getDataFromServer()
    .then((dataFromServer) => {
      app.fillMapbySimilarAnnouncements(dataFromServer);
      return dataFromServer;
    })
    .catch((errorText) => {
      const errorMessage = new ErrorMessage('map', errorText);
      errorMessage.show();
    })
    .then((dataFromServer) => {
      console.log(dataFromServer);
      app.activateFilterForm();
    });

  app.resetButton.addEventListener('click', app.reset);
}





