import {
  Form
} from './form.js';
import {
  HOUSING
} from '../data/housing.js';

class AdForm extends Form {

  constructor(formElementSelector) {
    super(formElementSelector);
    this.configurePristine();
    this.initPristine();
    this.validate();
  }

  initPristine(){
    this.pristine = new Pristine(this.form, {
      classTo: 'ad-form__element',
      errorClass: 'ad-form__element--invalid',
      successClass: 'ad-form__element--valid',
      errorTextParent: 'ad-form__element',
      errorTextTag: 'p',
      errorTextClass: 'ad-form__error'
    });
  }

  validate() {
    const form = this.form;
    const pristine = this.pristine;
    const price = form.querySelector('#price');
    const type = form.querySelector('#type');
    const roomNumber = form.querySelector('#room_number');
    const capacity = form.querySelector('#capacity');
    const timeIn = form.querySelector('#timein');
    const timeOut = form.querySelector('#timeout');

    const setMinPrice = (typeOfHousing) => {
      price.min = HOUSING[typeOfHousing].minPrice;
      price.setAttribute('placeholder', HOUSING[typeOfHousing].minPrice);
    };

    const setTimeIn = () => {
      timeIn.value = timeOut.value;
    };

    const setTimeOut = () => {
      timeOut.value = timeIn.value;
    };

    setMinPrice(type.value);
    let minPrice = HOUSING[type.value].minPrice;

    pristine.addValidator(
      price,
      (value) => value >= minPrice,
      () => `Минимальная цена за ночь: ${minPrice}`
    );

    pristine.addValidator(
      capacity,
      (value) => {
        if (value === '1' && (roomNumber.value === '1' || roomNumber.value === '2' || roomNumber.value === '3')) {
          return true;
        } else if (value === '2' && (roomNumber.value === '2' || roomNumber.value === '3')) {
          return true;
        } else if (value === '3' && (roomNumber.value === '3')) {
          return true;
        } else if (value === '0' && (roomNumber.value === '100')) {
          return true;
        } else {
          return false;
        }
      },
      () => {
        if (roomNumber.value === '1') {
          return 'Одна комната для 1 гостя';
        } else if (roomNumber.value === '2') {
          return 'Две ком. только для 1 или 2 гостей';
        } else if (roomNumber.value === '3') {
          return 'Только 1, 2 или 3 гостя';
        } else if (roomNumber.value === '100') {
          return '100 ком. не для гостей';
        }
      }

    );

    form.addEventListener('change', (evt) => {
      if (evt.target === type) {
        setMinPrice(type.value);
        minPrice = HOUSING[type.value].minPrice;
        pristine.validate(price);
      }

      if (evt.target === capacity || evt.target === roomNumber) {
        pristine.validate(capacity);
      }

      if (evt.target === timeIn) {
        setTimeOut();
      }

      if (evt.target === timeOut) {
        setTimeIn();
      }
    });

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      pristine.validate();
    });
  }
}

export {
  AdForm
};
