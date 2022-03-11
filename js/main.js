import { oneObjectWithRandomData } from './announcement-card-creator.js';

// Код только для проверки - аппендит новый элемент-объявку в карту
const map = document.querySelector('#map-canvas');
map.appendChild(oneObjectWithRandomData.createNew());
