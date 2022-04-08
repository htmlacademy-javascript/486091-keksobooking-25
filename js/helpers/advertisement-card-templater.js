import {housing} from '../settings/housing.js';

class AdvertisementCardTemplater { // Создаёт из шаблона элемент для балуна в метках похожих объявлений

  constructor(objectWithData) {
    this.setData(objectWithData);
    return this.card;
  }

  setData(objectWithData) {
    //Берём значения из объекта с данными и создаем переменные с помощью деструтурирующего присваивания.
    const {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos
    } = objectWithData.offer;
    const {
      avatar
    } = objectWithData.author;

    const cardElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
    const avatarElement = cardElement.querySelector('.popup__avatar');
    const titleElement = cardElement.querySelector('.popup__title');
    const addressElement = cardElement.querySelector('.popup__text--address');
    const priceElement = cardElement.querySelector('.popup__text--price');
    const typeElement = cardElement.querySelector('.popup__type');
    const capacityElement = cardElement.querySelector('.popup__text--capacity');
    const timeElement = cardElement.querySelector('.popup__text--time');
    const featuresWrapperElement = cardElement.querySelector('.popup__features');
    const descriptionElement = cardElement.querySelector('.popup__description');
    const photosWrapperElement = cardElement.querySelector('.popup__photos');

    avatarElement.src = avatar;
    titleElement.textContent = title;
    addressElement.textContent = address;
    priceElement.textContent = `${price} ₽/ночь`;
    typeElement.textContent = this.setTextContentForTypeElement(type);
    this.setWordDeclension(1, ['гость', 'гостя', 'гостей']);
    timeElement.textContent = `Заезд после ${checkin}, выезд до  ${checkout}`;
    capacityElement.textContent = `${rooms} ${this.setWordDeclension(rooms, ['комната', 'комнаты', 'комнат'])} для ${guests} ${this.setWordDeclension(guests, ['гостя', 'гостей', 'гостей'])}`;
    this.fillByFeaturesItems(features, featuresWrapperElement);
    this.fillByPhotos(photos, photosWrapperElement);
    this.fillDescriptionElement(description, descriptionElement);

    this.card = cardElement;
  }

  setTextContentForTypeElement(typeOfHousing) {
    return housing[typeOfHousing].translate;
  }

  fillByFeaturesItems(data, featuresWrapperElement) {
    if (data) {
      this.createFutureListItems(data, featuresWrapperElement);
    } else {
      featuresWrapperElement.style.display = 'none';
    }
  }

  createFutureListItems(data, featuresWrapperElement) {
    featuresWrapperElement.innerHTML = '';
    data.forEach((feature) => {
      const listItem = document.createElement('li');
      listItem.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresWrapperElement.appendChild(listItem);

    });
  }

  fillByPhotos(photos, photosWrapperElement) {
    if (!photos) {
      photosWrapperElement.style.display = 'none';
    } else {
      this.createImageElements(photos, photosWrapperElement);
    }
  }

  createImageElements(photos, photosWrapperElement) {
    const image = photosWrapperElement.querySelector('.popup__photo');
    photosWrapperElement.innerHTML = '';

    photos.forEach((imageLink) => {
      const newImage = image.cloneNode(true);
      newImage.src = imageLink;
      photosWrapperElement.appendChild(newImage);
    });
  }

  fillDescriptionElement(description, descriptionElement) {
    if (!description) {
      descriptionElement.style.display = 'none';
    } else {
      descriptionElement.textContent = description;
    }
  }

  setWordDeclension(number, words) {
    //https://realadmin.ru/coding/sklonenie-na-javascript.html
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
  }
}


export {
  AdvertisementCardTemplater
};
