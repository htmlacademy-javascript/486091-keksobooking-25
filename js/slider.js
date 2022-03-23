import {
  formAd
} from './form/ad-form.js';

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
      start: [1000],
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
    const slider = this.sliderElement;
    slider.noUiSlider.on('slide', () => {
      this.input.value = Number(slider.noUiSlider.get());
      this.pristine.validate(this.input);
    });

    this.input.addEventListener('change', () => {
      slider.noUiSlider.set(this.input.value);
    });
  }
}

export { Slider };
