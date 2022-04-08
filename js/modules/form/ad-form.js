import {housing} from '../../settings/housing.js';
import {FILE_TYPES} from '../../settings/file-types.js';
import {Form} from './form.js';
import {ErrorMessage} from '../../helpers/error-message.js';
import {SuccessMessage} from '../../helpers/success-message.js';

class AdForm extends Form { // Класс регулирующий работу формы добавления объявления

  constructor(formElementSelector) {
    super(formElementSelector);
    this.submitButton = document.querySelector('.ad-form__submit');
    this.sliderElement = document.querySelector('.ad-form__slider');
    this.configurePristine();
    this.initPristine();
    this.validate();
    this.setAvatarAddImageHandler();
    this.setAnnouncementsAddImageHandler();
  }

  initPristine() {
    this.pristine = new Pristine(this.form, {
      classTo: 'ad-form__element',
      errorClass: 'ad-form__element--invalid',
      successClass: 'ad-form__element--valid',
      errorTextParent: 'ad-form__element',
      errorTextTag: 'p',
      errorTextClass: 'ad-form__error'
    });
  }

  setAvatarAddImageHandler() { // Установи обработчик добавления изображения аватара
    this.avatarFileChooser = document.querySelector('#avatar');
    this.avatarPreview = document.querySelector('.ad-form-header__preview img');

    this.avatarFileChooser.addEventListener('change', () => {
      const file = this.avatarFileChooser.files[0];
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
      if (matches) {
        this.avatarPreview.src = URL.createObjectURL(file);
      }
    });
  }

  setAnnouncementsAddImageHandler() { // Установи обработчик добавления изображения объявления
    this.imageFileChooser = document.querySelector('#images');
    this.imagePreviewWrapper = document.querySelector('.ad-form__photo');


    this.imageFileChooser.addEventListener('change', () => {
      const file = this.imageFileChooser.files[0];
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
      if (matches) {
        if(!this.imagePreviewWrapper.hasChildNodes()) {

          this.imagePreview = document.createElement('img');
          this.imagePreview.style.width = '40px';
          this.imagePreview.style.height = 'auto';
          this.imagePreview.src = URL.createObjectURL(file);
          this.imagePreviewWrapper.appendChild(this.imagePreview);
        } else {
          this.imagePreview.src = URL.createObjectURL(file);
        }
      }
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
      price.min = housing[typeOfHousing].minPrice;
      price.setAttribute('placeholder', housing[typeOfHousing].minPrice);
    };

    const setTimeIn = () => {
      timeIn.value = timeOut.value;
    };

    const setTimeOut = () => {
      timeOut.value = timeIn.value;
    };

    setMinPrice(type.value);
    let minPrice = housing[type.value].minPrice;

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
        } else {return value === '0' && (roomNumber.value === '100');}
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

    form.addEventListener('input', (evt) => {
      if (evt.target === type) {
        setMinPrice(type.value);
        minPrice = housing[type.value].minPrice;
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
  }

  sendAdvertisementToServer(evt) {
    const pristine = this.pristine;


    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      this.disableSubmitButton();

      fetch('https://25.javascript.pages.academy/keksobooking', {
        method: 'POST',
        body: formData,

      }, )

        .then((response) => {
          if (response.ok) {
            const success = new SuccessMessage();
            success.show();
          } else {
            throw new Error();
          }

        })
        .catch(() => {
          const errorMessage = new ErrorMessage();
          errorMessage.show();
        });
    }
  }

  reset() {
    this.form.reset();
    this.pristine.reset();
    this.sliderElement.noUiSlider.reset();
    this.avatarPreview.src = 'img/muffin-grey.svg';
    this.imagePreviewWrapper.innerHTML = '';
  }

  disableSubmitButton() {
    this.submitButton.disabled = true;
    this.submitButton.style.opacity = '0.3';
    this.submitButton.style.pointerEvents = 'none';
  }

  activateSubmitButton() {
    this.submitButton.disabled = false;
    this.submitButton.style.opacity = '1';
    this.submitButton.style.pointerEvents = 'initial';
  }
}

export const formAd = new AdForm('.ad-form');
