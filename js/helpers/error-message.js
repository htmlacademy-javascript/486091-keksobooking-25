import {formAd} from '../modules/form/ad-form.js';

class ErrorMessage { // Класс для показа сообщений об ошибке
  constructor(errorType = 'form', errorMessageText) {
    this.setElement(errorType, errorMessageText);
    this.show();
  }

  setElement(errorType, errorMessageText) {
    this.element = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    this.textElement = this.element.querySelector('.error__message');

    this.button = this.element.querySelector('.error__button');

    if (errorType === 'map') {
      this.textElement.textContent = errorMessageText;
      this.textElement.textContent = `Похожие объявления не загрузились: ${errorMessageText}`;
      this.button.textContent = 'Закрыть.';
    }
  }

  show() {
    document.body.appendChild(this.element);

    this.button.addEventListener('click', this.removeElementByClick);
    document.addEventListener('click', this.removeElementByClick);
    this.button.addEventListener('keydown', this.removeElementByButton);
    this.button.focus();
  }

  removeElementByClick () {
    this.removeElement();
    this.removeClickEvent(this.removeElementByClick);
    this.removeKeydownEvent(this.removeElementByButton);
    formAd.activateSubmitButton();
  }

  removeElementByButton (evt) {
    evt.preventDefault();
    if (evt.code === 'Escape'){
      this.removeElement();
      this.removeClickEvent(this.removeElementByClick);
      this.removeKeydownEvent(this.removeElementByButton);
      formAd.activateSubmitButton();
    }
  }

  removeClickEvent(cb) {
    this.button.addEventListener('click', cb);
    document.removeEventListener('click', cb);
  }

  removeKeydownEvent(cb) {
    this.button.removeEventListener('keydown', cb);
  }

  removeElement()  {
    this.element.remove();
  }
}

export {
  ErrorMessage
};
