import { card } from './announcement-card-templater.js';
import { Form } from './form.js';
import { Map } from './map.js';
// Код только для проверки - аппендит новый элемент-объявку в карту
const map = document.querySelector('#map-canvas');
map.appendChild(card);

//Операции с формами, опять же тупо для проверки.
const formAd = new Form('.ad-form');
const formFilter = new Form('.map__filters');

//Так как ESlint не понимают, что могут проходить операции в конструкторе
//класса и даже если я не использовал переменную, это не значит, что она ничего не делает
// пишу этот код (Гавнокод)

if (!Map.isActive() && formAd && formFilter) { //вызов форм добавил для убирания ошибки
  //Если в классе формы isMapActive() возвращает False, до карта очищается. Но опять же
  //это сделано для еслинт
  map.innerHTML = '';
}

//Я не любитель многих комментариев, пишу для тебя, чтобы ты не спрашивал зачем я это сделал.
// В продакшине их не будет конечно же.
