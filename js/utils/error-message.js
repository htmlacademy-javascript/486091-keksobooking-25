class ErrorMessage {
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
      this.button.textContent = 'Ну не загрузились и ладно.';
    }
  }

  show() {
    document.body.appendChild(this.element);
    const remove = () => {
      this.close(remove);
    };
    this.button.addEventListener('click', remove);

    setTimeout(remove, 103000, remove);
  }

  close(cb) {
    document.body.removeChild(this.element);
    this.button.removeEventListener('click', cb);
  }
}

export {
  ErrorMessage
};
