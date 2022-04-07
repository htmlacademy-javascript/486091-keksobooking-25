import {app} from './modules/app/app.js';

app.disableAdvertisementForm(); // Блокируем форму добавления объявления
app.disableFilterForm(); // Блокируем форму-фильтр

if (app.initMap()) { // И если карта загружена ,то ...
  app.activateAdvertisementForm(); // Активируем форму добавления  объявления
  app.advertisementForm.addEventListener('submit', app.sendAdvertisementToServer);


  app.getDataFromServer() // Получаем похожие объявления с сервера
    .then((dataFromServer) => { // Если мы их получили, то
      app.fillMapBySimilarAdvertisements(dataFromServer); // Выводим на карту похожие объявления
      app.activateFilterForm(); // Активируем форму-фильтр
      app.sortAdvertisements(dataFromServer);
      return dataFromServer;
    })
    .catch((errorText) => { // В случае ошибки
      app.showLoadErrorMessage(errorText);// Показываем текст ошибки пользователю
    });

  app.resetButton.addEventListener('click', app.reset); // Сбрасываем приложение при нажатии на соответствующую кнопку
}
