import {
  Map
} from './map.js';

class Form {

  constructor(formElementSelector) {
    this.form = document.querySelector(formElementSelector);
    this.formElements = this.form.elements;
    this.formStatusHandler();
  }

  formStatusHandler() {
    if (Map.isActive()) {
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
export {
  Form
};
