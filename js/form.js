class Form {

  static isMapActive()  {
    return false; //я прекрасно понимаю, что будет отслеживаться событие загрузки карты. Но пока сделал так
  }

  constructor(formElementSelector) {
    this.form = document.querySelector(formElementSelector);
    this.formElements = this.form.elements;
    this.isMapActive = true; //я прекрасно понимаю, что будет отслеживаться событие загрузки карты. Но пока сделал так
    this.formStatusHandler();
  }

  formStatusHandler() {
    if (Form.isMapActive()) {
      this.formActivation();
    } else {
      this.formDisActivation();
    }
  }

  formActivation() {
    this.form.classList.remove('ad-form--disabled');
    for (let i = 0; i < this.formElements.length; i++) {
      const element = this.formElements[i];
      element.disabled = false;
    }
  }

  formDisActivation() {
    this.form.classList.add('ad-form--disabled');
    for (let i = 0; i < this.formElements.length; i++) {
      const element = this.formElements[i];
      element.disabled = true;
    }
  }

}
export { Form };
