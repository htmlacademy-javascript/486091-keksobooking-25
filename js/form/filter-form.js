import {
  Form
} from './form.js';

class FilterForm extends Form {
  constructor(formElementSelector) {
    super(formElementSelector);

    this.element = document.querySelector('.map__filters');
    this.featuresElement = this.element.querySelectorAll('#housing-features');
    this.getValue();
  }

  getValue() {
    this.type = this.element.querySelector('#housing-type').value;
    this.price = this.element.querySelector('#housing-price').value;
    this.rooms = this.element.querySelector('#housing-rooms').value;
    this.guests = this.element.querySelector('#housing-guests').value;
    this.getCheckedFeatures();
  }

  getCheckedFeatures() {
    //https://stackoverflow.com/questions/590018/getting-all-selected-checkboxes-in-an-array
    this.features = Array.from(this.element.querySelectorAll('input[name=\'features\']:checked')).map((elem) => elem.value);
  }
}

const formFilter = new FilterForm('.map__filters');

export {
  formFilter
};
