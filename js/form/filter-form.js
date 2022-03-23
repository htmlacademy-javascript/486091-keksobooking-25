import { Form } from './form.js';

class FilterForm extends Form {
  constructor(formElementSelector) {
    super(formElementSelector);
  }

}

const formFilter = new FilterForm('.map__filters');

export { formFilter };
