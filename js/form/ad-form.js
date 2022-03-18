import {Form} from './form.js';
import {HOUSING} from '../data/housing.js';

class AdForm extends Form {

  constructor(formElementSelector) {
    super(formElementSelector);
    this.setPristine();
    this.validate();
  }

  validate() {
    const form = this.form;
    const pristine = this.pristine;
    const title = form.querySelector('#title');
    const price = form.querySelector('#price');
    const type = form.querySelector('#type');
    const room_number = form.querySelector('#room_number');
    const capacity = form.querySelector('#capacity');

    const setMinPrice = (typeOfHousing) => {
      price.min = HOUSING[typeOfHousing].minPrice;
      price.setAttribute('placeholder', HOUSING[typeOfHousing].minPrice);
    }
    setMinPrice(type.value);
    let minPrice = HOUSING[type.value].minPrice;

    pristine.addValidator(
      price,
      function (value) {
        return value >= minPrice;
      },
      function () {
        return `Минимальная цена за ночь: ${minPrice}`;
      }
    );

    pristine.addValidator(
      capacity,
      function (value) {
        if(value === '1' && (room_number.value === '1' || room_number.value === '2' || room_number.value === '3')) {
          return true;
        } else if (value === '2' && (room_number.value === '2' || room_number.value === '3')) {
          return true;
        } else if (value === '3' && (room_number.value === '3')) {
          return true;
        } else if (value === '0' && (room_number.value === '100')) {
          return true;
        } else {
          return false;
        }
      },
      function () {
        if (room_number.value === '1') {
          return 'Одна комната для 1 гостя';
        } else if (room_number.value === '2') {
          return 'Две ком. только для 1 или 2 гостей';
        } else if (room_number.value === '3') {
          return 'Только 1, 2 или 3 гостя';
        } else if (room_number.value === '100') {
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

      if (evt.target === capacity || evt.target === room_number) {
        pristine.validate(capacity);
      }
    })

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      pristine.validate();
    });
  }
}

export {
  AdForm
};
