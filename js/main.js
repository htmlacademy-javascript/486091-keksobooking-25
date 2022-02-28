const randomizer = {
  getPositiveInteger: function (a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  },

  getPositiveFloat: function (a, b, digits = 1) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;
    return Number(result.toFixed(digits));
  },

  shuffleArray(array) {
    const newArray = array.slice();
    let j, temp;
    for (let i = newArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArray[j];
      newArray[j] = newArray[i];
      newArray[i] = temp;
    }
    return newArray;
  },

  getRandomValuesFromArray: function (array) {
    array = this.shuffleArray(array);
    array.length = this.getPositiveInteger(1, array.length);
    return array;
  },

  getRandomValueFromArray: function (array) {
    const arrayLastItem = array.length - 1;
    return array[this.getPositiveInteger(1, arrayLastItem)];
  }
};

const SEMPLE_DATA = {
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  types: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  titles: ['Семье без детей сдается в аренду балкон', 'Компактная квартира для большой семьи', 'Сдается монгольская юрта', 'Сдам квартиру с клопами и алкашами', 'Сдам квартиру в которой ночевал Юрий Шевчук', 'Сдается койко-место люкс', 'СТОЯНОЧКА!!! Квартира для Вашей семьи', 'СУППЕР ПРЕДЛОЖЕНИЕ ДЛЯ ДОЛГОЖИТЕЛЕЙ С ПЕРСПЕКТИВОЙ В БУДУЩЕЕ', 'это лучше чем жить на улице', 'если у вас есть собака, соседи там глухие пусть хоть завоется'],
  descriptions: ['Скромное убежище одинокого айтишника', 'Элитные апартаменты для владельцев хомячков', 'Заходить можно с 7:00 до 22:00 (строго!), так как в комнате живет бабушка, и она может проснуться».', '«Достался по наследству. Крыша протекает, нужно перестилать полы. На участке есть две яблони, кусты и сарай. Продам или обменяю на ворота ручной ковки, новые»', 'Конкурентное преимущество – на крыше СОСЕДНЕГО ДОМА (sic!) можно устроить зимний сад, или расширить площадь квартиры. Нужно только договориться с соседями (у нас не получилось)', 'Отличный вид на крыши, видно даже Кремль. Можно оборудовать биотуалет или ходить в туалет на стройке рядом с домом (ключи от него есть). Через квартал находится баня', 'Сдается семье буддистов, христиан, ханафитов. Без животных, в т. ч. котов, кошек и котят (даже лысых, стерилизованных, кастрированных, приученных и перенесших прочие издевательства), собак (в т. ч. совсем маленьких, имеющих награды и безумно дорогих), змей, попугайчиков, хорьков, крыс и насекомых.', 'Хозяин – интеллегентный (авторский стиль), интересный мужчина в самом рассвете лет. При взаимном контакте возможно счастливое бракосочетание в уже совместной квартире. Кто не рискует – тот не пьет шампанского. Решение за Вами.', 'Эта улица возникла во II половине прошлого века. В основном здесь селились чиновники, крупные предприниматели, буржуа. Прекрасные соседи с высоким уровнем жизни. Только в этой квартире Вы по-настоящему будете счастливы! Прекрасная аура!', 'С балкона открывается прекрасный вид на парк и набережную. А налево можно и не смотреть (там стоит нефтеперерабатывающий завод)', 'Этажом выше живет музыкант. Но играет он тихо и в основном классическую музыку.'],
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
};

class RandomAnnouncement {
  constructor(counter) {
    this.stringCount = this.createStringValueFromCounter(counter);
    this.avatar = `img/avatars/user${this.stringCount}.png`;
    this.title = randomizer.getRandomValueFromArray(SEMPLE_DATA.titles);
    this.price = randomizer.getPositiveInteger(1000, 3000);
    this.type = randomizer.getRandomValueFromArray(SEMPLE_DATA.types);
    this.rooms = randomizer.getPositiveInteger(1, 5);
    this.guests = randomizer.getPositiveInteger(1, 10);
    this.checkin = `${randomizer.getPositiveInteger(12, 14)}:00`;
    this.checkout = `${randomizer.getPositiveInteger(12, 14)}:00`;
    this.features = randomizer.getRandomValuesFromArray(SEMPLE_DATA.features);
    this.description = randomizer.getRandomValueFromArray(SEMPLE_DATA.descriptions);
    this.photos = randomizer.getRandomValuesFromArray(SEMPLE_DATA.photos);
    this.lat = randomizer.getPositiveFloat(35.65000, 35.70000, 5);
    this.lng = randomizer.getPositiveFloat(139.70000, 139.80000, 5);
    this.address = `${this.lat}, ${this.lng}`;
  }

  createStringValueFromCounter(counter) {
    const stringCount = counter.toString();
    if (counter < 10) {
      return `0${stringCount}`;
    }
    return stringCount;
  }

  getNewObjectWithSempleData() {
    return {
      author: {
        avatar: this.avatar,
      },
      offer: {
        title: this.title,
        address: this.address,
        price: this.price,
        type: this.type,
        rooms: this.rooms,
        guests: this.guests,
        checkin: this.checkin,
        checkout: this.checkout,
        features: this.features,
        description: this.description,
        photos: this.photos,
      },
      location: {
        lat: this.lat,
        lng: this.lng
      }
    };
  }
}

const createArrayWithDataObjects = (count) => {
  const arrWithObjects = [];
  for (let i = 1; i <=count; i++) {
    const obj = new RandomAnnouncement(i);
    arrWithObjects.push(obj.getNewObjectWithSempleData());
  }
  return arrWithObjects;
};

createArrayWithDataObjects(10);
