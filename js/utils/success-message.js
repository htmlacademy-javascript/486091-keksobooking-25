import {formAd} from '../form/ad-form.js';
import {formFilter} from '../form/filter-form.js';
import {map} from '../map.js';

class SuccessMessage {
  constructor() {
    this.setElement();
  }

  setElement() {
    this.element = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  }

  show() {
    document.body.appendChild(this.element);

    const removeElement = (evt) => {
      if (evt.type === 'click' || evt.code === 'Escape') {
        this.close(removeElement);
        formAd.reset();
        formFilter.reset();
        map.reset();
        formAd.activateSubmitButton();
      }
    };

    document.addEventListener('click', removeElement);
    this.element.addEventListener('keydown', removeElement);
    this.element.tabIndex = 1;
    this.element.focus();
  }

  close(eventFunction) {
    this.removeElement();
    this.removeEvents(eventFunction);
  }

  removeEvents(cb) {
    document.removeEventListener('click', cb);
    this.element.removeEventListener('keydown', cb);
  }

  removeElement()  {
    this.element.remove();
  }

}

export {
  SuccessMessage
};
