import {formAd} from '../form/ad-form.js';

class ErrorMessage {
  constructor(errorType = 'form', errorMessageText) {
    this.setElement(errorType, errorMessageText);
    this.show()
  }

  setElement(errorType, errorMessageText) {
    this.element = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    this.textElement = this.element.querySelector('.error__message');

    this.button = this.element.querySelector('.error__button');

    if (errorType === 'map') {
      this.textElement.textContent = errorMessageText;
      this.textElement.textContent = `Похожие объявления не загрузились: ${errorMessageText}`;
      this.button.textContent = 'Ну не загрузились и ладно.';
    }
  }

  show() {
    document.body.appendChild(this.element);


    const removeByClick = (evt) => {
      this.removeElement();
      this.removeClickEvent(removeByClick);
      this.removeKeydownEvent(removeByButton)
      formAd.activateSubmitButton();
    };

    const removeByButton = (evt) => {
        evt.preventDefault();
        if (evt.code === 'Escape'){
          this.removeElement();
          this.removeClickEvent(removeByClick);
          this.removeKeydownEvent(removeByButton)
          formAd.activateSubmitButton();
        }
    }

    this.button.addEventListener('click', removeByClick);
    document.addEventListener('click', removeByClick);
    this.button.addEventListener('keydown', removeByButton);
    this.button.focus();
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
