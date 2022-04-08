import {formAd} from '../modules/form/ad-form.js';

class ErrorMessage { // Класс для показа сообщений об ошибке
  constructor(errorType = 'form', errorMessageText) {
    this.setElement(errorType, errorMessageText);
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

    const removeElement = (evt) => {
      if (evt.code !== 'Escape' && evt.type === 'keydown') {
        return;
      }

      if (evt.code === 'Escape' && evt.type === 'keydown') {
        evt.preventDefault();
      }

      this.element.remove();
      this.removeEvents(removeElement);
      formAd.activateSubmitButton();
    };

    this.button.addEventListener('click', removeElement);
    document.addEventListener('click', removeElement);
    this.button.addEventListener('keydown', removeElement);
    this.button.focus();
  }

  removeEvents(cb) {
    this.button.addEventListener('click', cb);
    document.removeEventListener('click', cb);
    this.button.removeEventListener('keydown', cb);
  }

}

export {
  ErrorMessage
};
