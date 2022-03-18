import {
  Map
} from '../map.js';

class Form {

  constructor(formElementSelector) {
    this.formInit(formElementSelector);
  }

  formInit(formElementSelector) {
    this.form = document.querySelector(formElementSelector);
    this.formElements = this.form.elements;
    this.formStatusHandler();
  }

  setPristine() {
    const locale = 'ru';
    const parameter = ['${', '1}'].join('');
    const messages = {
      required: 'Это поле обязательно к заполнению',
      email: 'Введите корректный e-mail адрес',
      number: 'Это поле должно быть числом',
      integer: 'Это поле должно быть только целым числом',
      url: 'Это поле должно содержать ссылку URL',
      tel: 'Введите корректный номер телефона',
      maxlength: `Длина этого поля доложна быть не больше ${parameter} символов`,
      minlength: `Длина этого поля должна быть не меньше ${parameter} символов`,
      min: `Минимальное значение этого поля  ${parameter}`,
      max: `Максимальное значение этого поля ${parameter}`,
      pattern: 'Please match the requested format',
      equals: 'The two fields do not match',
      default: 'Пожалуйста, введите корректно езначение'
    };
    Pristine.setLocale(locale);
    Pristine.addMessages(locale, messages);
    Pristine.addValidator('input-length', (value, minlength, maxLength) => {
      if (value >= parseInt(minlength, 10) && value <= parseInt(maxLength, 10)) {
        return true;
      }
      return false;
    });


    this.pristine = new Pristine(this.form, {
      classTo: 'ad-form__element',
      errorClass: 'form__item--invalid',
      successClass: 'form__item--valid',
      errorTextParent: 'ad-form__element',
      errorTextTag: 'span',
      errorTextClass: 'form__error'
    });
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
