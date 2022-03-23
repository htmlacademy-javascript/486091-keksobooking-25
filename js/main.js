import { formAd } from './form/ad-form.js';
import { formFilter } from './form/filter-form.js';
import { map, isMapActive } from './map.js';
import { Slider } from './slider.js';


const rangeSlider = new Slider('.ad-form__slider', '#price');

// Код только для проверки - аппендит новый элемент-объявку в карту





//Так как ESlint не понимают, что могут проходить операции в конструкторе
//класса и даже если я не использовал переменную, это не значит, что она ничего не делает
// пишу этот код (Гавнокод)

if (isMapActive && formAd && formFilter) { //вызов форм добавил для убирания ошибки
  //Если в классе формы isMapActive() возвращает False, до карта очищается. Но опять же
  //это сделано для еслинт
  map.innerHTML = '';
}


