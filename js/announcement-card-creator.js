import {
  arrayWithRandomData
} from './random-announcement.js';

class AnnouncementCardCreator {
  constructor(arrayWithData) {
    //Определяем свойства для массива с данными
    this.data = arrayWithData.offer;
    this.data.avatar = arrayWithData.author.avatar;

    //Находим элементы из которых состоит карточка объявления
    const template = document.querySelector('#card');
    this.card = template.content.cloneNode(true);
    this.avatar = this.card.querySelector('.popup__avatar');
    this.title = this.card.querySelector('.popup__title');
    this.address = this.card.querySelector('.popup__text--address');
    this.price = this.card.querySelector('.popup__text--price');
    this.type = this.card.querySelector('.popup__type');
    this.capacity = this.card.querySelector('.popup__text--capacity');
    this.time = this.card.querySelector('.popup__text--time');
    this.features = this.card.querySelector('.popup__features');
    this.description = this.card.querySelector('.popup__description');
    this.photos = this.card.querySelector('.popup__photos');
  }

  // Заполняем карточку шаблона данными из массива
  fillTemplateByData() {
    this.title.textContent = this.data.title ? this.data.title : null;
    this.address.textContent = this.data.address ? this.data.address : null;
    this.price.textContent = this.data.price ? `${this.data.price} ₽/ночь` : null;
    this.type.textContent = this.setHousingType();
    this.capacity.textContent = `${this.data.rooms} комнаты для ${this.data.guests} гостей`;
    this.time.textContent = `Заезд после ${this.data.checkin}, выезд до  ${this.data.checkout} гостей`;
    this.setHousingFeatures();
    this.description.textContent = this.data.description ? this.data.description : null;
    this.avatar.src = this.data.avatar ? this.data.avatar : '';
    this.setHousingFotos();
  }

  // Сеттеры для сложно-герерируемых свойств объекта
  setHousingType() {
    if (this.data.type === 'flat') {
      return 'Квартира';
    }
    if (this.data.type === 'bungalow') {
      return 'Бунгало ';
    }
    if (this.data.type === 'house') {
      return 'Дом';
    }
    if (this.data.type === 'palace') {
      return 'Дворец';
    }
    if (this.data.type === 'hotel') {
      return 'Отель';
    }
    return null;
  }

  setHousingFeatures() {
    this.features.innerHTML = '';
    this.data.features.forEach((feature) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      this.features.appendChild(featureItem);

    });
  }

  setHousingFotos() {
    const foto = this.photos.querySelector('.popup__photo');
    this.photos.innerHTML = '';
    if (this.data.photos) {
      this.data.photos.forEach((imageLink) => {
        const newFotoImage = foto.cloneNode(true);
        newFotoImage.src = imageLink;
        this.photos.appendChild(newFotoImage);
      });
    }
  }

  // Скрываем элементы, в которых нет данных
  hideEmptyElements() {
    if (!this.data.avatar) {
      this.avatar.style.display = 'none';
    }
    if (!this.data.title) {
      this.title.style.display = 'none';
    }
    if (!this.data.address) {
      this.address.style.display = 'none';
    }
    if (!this.data.price) {
      this.price.style.display = 'none';
    }
    if (!this.type.textContent) {
      this.type.style.display = 'none';
    }
    if (!this.data.rooms && this.data.guests) {
      this.capacity.textContent = `для ${this.data.guests} гостей`;
    }
    if (this.data.rooms && !this.data.guests) {
      this.capacity.textContent = `${this.data.rooms} комнаты`;
    }
    if (!this.data.rooms && !this.data.guests) {
      this.capacity.style.display = 'none';
    }
    if (!this.data.checkin && this.data.checkout) {
      this.time.textContent = ` выезд до  ${this.data.checkout} гостей`;
    }
    if (this.data.checkin && !this.data.checkout) {
      this.time.textContent = `Заезд после ${this.data.checkin}`;
    }
    if (!this.data.checkin && !this.data.checkout) {
      this.time.style.display = 'none';
    }
    if (!this.data.description) {
      this.description.style.display = 'none';
    }
    if (!this.features.hasChildNodes()) {
      this.features.style.display = 'none';
    }
    if (!this.photos.hasChildNodes()) {
      this.photos.style.display = 'none';
    }
  }

  //Возвращаем карточку, заполнив ее данными и удалив пустые элементы
  createNew() {
    this.fillTemplateByData();
    this.hideEmptyElements();
    return this.card;
  }
}

//Нерефрактабельный код, который будет удалён, создаёт объект, изменяет данные из массива
export const oneObjectWithRandomData = new AnnouncementCardCreator(arrayWithRandomData[0]);
