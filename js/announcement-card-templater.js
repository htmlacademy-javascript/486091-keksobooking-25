import {
  DataController
} from './data-controller.js';

class AnnouncementCardTemplater {

  constructor(objectWithData) {
    this.setData(objectWithData);
    this.setCardElementFromTemplate();
    this.setCardChildElements();
    this.fillCardChildElementsByData();
    return this.card;
  }

  setData(objectWithData) {
    this.data = objectWithData.offer;
    this.data.avatarLink = objectWithData.author.avatar;
  }

  setCardElementFromTemplate() {
    const template = document.querySelector('#card');
    this.card = template.content.cloneNode(true);
  }

  setCardChildElements() {
    const cardElementsSelectors = ['.popup__avatar', '.popup__title', '.popup__text--address', '.popup__text--price', '.popup__type', '.popup__text--capacity', '.popup__text--time', '.popup__features', '.popup__description', '.popup__photos'];

    const cardElements = cardElementsSelectors.map((selector) => this.card.querySelector(selector));

    [this.avatar, this.title, this.address, this.price, this.type, this.capacity, this.time, this.features, this.description, this.photos] = cardElements;
  }

  fillCardChildElementsByData() {
    this.fillTextElement('address');
    this.fillTextElement('title');
    this.fillTextElement('description');
    this.fillComplexElement('price');
    this.fillComplexElement('type');
    this.fillComplexElement('avatar');
    this.fillComplexElement('time');
    this.fillComplexElement('capacity');
    this.createListElements('features');
    this.createImageElements('photos');
  }

  fillTextElement(element) {
    const data = this.data;
    if (data[element]) {
      this[element].textContent = data[element];
    } else {
      this.hideElement(this[element]);
    }
  }

  fillComplexElement(element) {
    const data = this.data;
    let roomWord = '';
    let guestWord = '';

    switch (element) {
      case 'price':
        if (data[element]) {
          this[element].textContent = `${data[element]} ₽/ночь`;
        } else {
          this.hideElement(this[element]);
        }
        break;
      case 'type':
        if (data[element]) {
          const housingTypesTranslate = {
            palace: 'Дворец',
            flat: 'Квартира',
            house: 'Дом',
            bungalow: 'Бунгало',
            hotel: 'Отель ',
          };
          const translatedElement = housingTypesTranslate[data[element]];
          this[element].textContent = translatedElement;
        } else {
          this.hideElement(this[element]);
        }
        break;
      case 'avatar':
        if (data.avatarLink) {
          this[element].src = data.avatarLink;
        } else {
          this.hideElement(this[element]);
        }
        break;
      case 'time':
        if (data.checkin && data.checkout) {
          this[element].textContent = `Заезд после ${data.checkin}, выезд до  ${data.checkout}`;
        } else if (data.checkin && !data.checkout) {
          this[element].textContent = `Заезд после ${data.checkin}`;
        } else if (!data.checkin && data.checkout) {
          this[element].textContent = `Выезд до ${data.checkout}`;
        } else {
          this.hideElement(this[element]);
        }
        break;
      case 'capacity':
        if (data.rooms === 1) {
          roomWord = 'комната';
        } else if (data.rooms > 1 && data.rooms < 5) {
          roomWord = 'комнаты';
        } else if (data.rooms >= 5) {
          roomWord = 'комнат';
        }

        if (data.guests === 1) {
          guestWord = 'гостя';
        } else if (data.guests > 1) {
          guestWord = 'гостей';
        }

        if (data.rooms && data.guests) {
          this[element].textContent = `${data.rooms} ${roomWord} для ${data.guests} ${guestWord}`;
        } else if (data.rooms && !data.guests) {
          this[element].textContent = `${data.rooms} ${roomWord}`;
        } else if (!data.rooms && !data.guests) {
          this[element].textContent = `Для ${data.guests} ${guestWord}`;
        } else {
          this.hideElement(this[element]);
        }
        break;
    }
  }

  createListElements(parentElement) {
    const data = this.data;
    if (!data[parentElement]) {
      return this.hideElement(this[parentElement]);
    }
    this[parentElement].innerHTML = '';
    data[parentElement].forEach((childElement) => {
      const listItem = document.createElement('li');
      listItem.classList.add('popup__feature', `popup__feature--${childElement}`);
      this[parentElement].appendChild(listItem);

    });
  }

  createImageElements(wrapperElement) {
    if (!this.data.photos) {
      return this.hideElement(this[wrapperElement]);
    }
    const data = this.data;
    const foto = this[wrapperElement].querySelector('.popup__photo');
    this[wrapperElement].innerHTML = '';

    data.photos.forEach((imageLink) => {
      const newFotoImage = foto.cloneNode(true);
      newFotoImage.src = imageLink;
      this[wrapperElement].appendChild(newFotoImage);
    });

  }

  hideElement(element) {
    element.style.display = 'none';
  }
}

const dataController = new DataController;
export const oneObjectWithRandomData = dataController.createRandomDataObject();

export const card = new AnnouncementCardTemplater(oneObjectWithRandomData);
