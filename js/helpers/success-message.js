import {formAd} from '../modules/form/ad-form.js';
import {formFilter} from '../modules/form/filter-form.js';
import {map} from '../modules/map/map.js';

class SuccessMessage { // Класс для показа сообщения об успешной отправке формы
  constructor() {
    this.setElement();
  }

  setElement() {
    this.element = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  }

  show() {
    document.body.appendChild(this.element);

    const onSuccessMessageElementKeydownOrClick = (evt) => {
      if (evt.type === 'click' || evt.code === 'Escape') {
        this.close(onSuccessMessageElementKeydownOrClick);
        formAd.reset();
        formFilter.reset();
        map.reset();
        formAd.activateSubmitButton();
      }
    };

    document.addEventListener('click', onSuccessMessageElementKeydownOrClick);
    this.element.addEventListener('keydown', onSuccessMessageElementKeydownOrClick);
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
