import { formAd } from './form/ad-form.js';

class Slider {

  constructor(sliderCssSelector, formInputCssSelector) {
    this.setSliderElemnt(sliderCssSelector);
    this.setRelatedFormInput(formInputCssSelector);
    this.setSliderConfiguration();
    this.setValidator();
    this.eventsHandler();
  }

  setSliderConfiguration() {
    noUiSlider.create(this.sliderElement, {
      start: [0],
      step: 1,
      range: {
        'min': [0],
        'max': [100000]
      },
      connect: 'lower',
    });
  }

  setSliderElemnt(sliderCssSelector) {
    this.sliderElement = document.querySelector(sliderCssSelector);
  }

  setRelatedFormInput(formInputCssSelector) {
    this.input = document.querySelector(formInputCssSelector);
  }

  setValidator() {
    this.pristine = formAd.pristine;
  }

  eventsHandler() {

    const sliderElement = this.sliderElement;
    sliderElement.noUiSlider.on('slide', () => {
      this.input.value = Number(sliderElement.noUiSlider.get());
      this.pristine.validate(this.input);
    });

    this.input.addEventListener('change', () => {
      sliderElement.noUiSlider.set(this.input.value);
    });

    const resetButton = document.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', () => {
      sliderElement.noUiSlider.reset();
    });
  }
}

export const slider = new Slider('.ad-form__slider', '#price');

