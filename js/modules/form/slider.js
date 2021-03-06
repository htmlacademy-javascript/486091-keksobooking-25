import {formAd} from './ad-form.js';

class Slider { // Класс регулирующий работу Nouslider, используемый для ввода цены с помощью мыши

  constructor(sliderCssSelector, formInputCssSelector) {
    this.setElement(sliderCssSelector);
    this.setRelatedFormInput(formInputCssSelector);
    this.setSliderConfiguration();
    this.setValidator();
    this.controlEventHandlers();
  }

  setSliderConfiguration() {
    noUiSlider.create(this.element, {
      start: [0],
      step: 1,
      range: {
        'min': [0],
        'max': [100000]
      },
      connect: 'lower',
    });
  }

  setElement(sliderCssSelector) {
    this.element = document.querySelector(sliderCssSelector);
  }

  setRelatedFormInput(formInputCssSelector) {
    this.input = document.querySelector(formInputCssSelector);
  }

  setValidator() {
    this.pristine = formAd.pristine;
  }

  controlEventHandlers() {

    const element = this.element;
    element.noUiSlider.on('slide', () => {
      this.input.value = Number(element.noUiSlider.get());
      this.pristine.validate(this.input);
    });

    this.input.addEventListener('change', () => {
      element.noUiSlider.set(this.input.value);
    });

    const resetButton = document.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', () => {
      element.noUiSlider.reset();
    });
  }
}

export const slider = new Slider('.ad-form__slider', '#price');

