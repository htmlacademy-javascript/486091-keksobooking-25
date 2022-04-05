import {app} from './app.js';

app.disableAddAnnouncementForm(); // Блокируем форму добавления объявления
app.disableFilterAnnouncemensForm(); // Блокируем форму-фильтр

if (app.initMap()) { // И если карта загружена ,то ...
  app.activateAddAnnouncementForm(); // Активируем форму добавления  объявления
  app.addAnnouncementForm.addEventListener('submit', app.sendAnnouncementToServer);


  app.getDataFromServer() // Получаем похожие объявления с сервера
    .then((dataFromServer) => { // Если мы их получили, то
      app.fillMapbySimilarAnnouncements(dataFromServer); // Выводим на карту похожие объявления
      app.activateFilterForm(); // Активируем форму-фильтр
      app.addFilterAnnouncemensForm(dataFromServer);
      return dataFromServer;
    })
    .catch((errorText) => { // В случае ошибки
      app.showLoadErrorMessage(errorText);// Показываем текст ошибки пользователю
    });

  app.resetButton.addEventListener('click', app.reset); // Сбрасываем приложение при нажатии на соответствующую кнопку
}


