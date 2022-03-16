import {
  randomizer
} from './randomizer.js';

class DataController {

  constructor() {
    if (!this.getDataFromServer()) {
      this.setRandomData();
    }
  }

  getDataFromServer() {
    return false;
  }

  setRandomData() {
    this.SEMPLE_DATA = {
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      types: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
      titles: ['Семье без детей сдается в аренду балкон', 'Компактная квартира для большой семьи', 'Сдается монгольская юрта', 'Сдам квартиру с клопами и алкашами', 'Сдам квартиру в которой ночевал Юрий Шевчук', 'Сдается койко-место люкс', 'СТОЯНОЧКА!!! Квартира для Вашей семьи', 'СУППЕР ПРЕДЛОЖЕНИЕ ДЛЯ ДОЛГОЖИТЕЛЕЙ С ПЕРСПЕКТИВОЙ В БУДУЩЕЕ', 'это лучше чем жить на улице', 'если у вас есть собака, соседи там глухие пусть хоть завоется'],
      descriptions: ['Скромное убежище одинокого айтишника', 'Элитные апартаменты для владельцев хомячков', 'Заходить можно с 7:00 до 22:00 (строго!), так как в комнате живет бабушка, и она может проснуться».', '«Достался по наследству. Крыша протекает, нужно перестилать полы. На участке есть две яблони, кусты и сарай. Продам или обменяю на ворота ручной ковки, новые»', 'Конкурентное преимущество – на крыше СОСЕДНЕГО ДОМА (sic!) можно устроить зимний сад, или расширить площадь квартиры. Нужно только договориться с соседями (у нас не получилось)', 'Отличный вид на крыши, видно даже Кремль. Можно оборудовать биотуалет или ходить в туалет на стройке рядом с домом (ключи от него есть). Через квартал находится баня', 'Сдается семье буддистов, христиан, ханафитов. Без животных, в т. ч. котов, кошек и котят (даже лысых, стерилизованных, кастрированных, приученных и перенесших прочие издевательства), собак (в т. ч. совсем маленьких, имеющих награды и безумно дорогих), змей, попугайчиков, хорьков, крыс и насекомых.', 'Хозяин – интеллегентный (авторский стиль), интересный мужчина в самом рассвете лет. При взаимном контакте возможно счастливое бракосочетание в уже совместной квартире. Кто не рискует – тот не пьет шампанского. Решение за Вами.', 'Эта улица возникла во II половине прошлого века. В основном здесь селились чиновники, крупные предприниматели, буржуа. Прекрасные соседи с высоким уровнем жизни. Только в этой квартире Вы по-настоящему будете счастливы! Прекрасная аура!', 'С балкона открывается прекрасный вид на парк и набережную. А налево можно и не смотреть (там стоит нефтеперерабатывающий завод)', 'Этажом выше живет музыкант. Но играет он тихо и в основном классическую музыку.'],
      photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
    };
  }

  createRandomDataObject() {
    const SEMPLE_DATA = this.SEMPLE_DATA;

    const title = randomizer.getRandomValueFromArray(SEMPLE_DATA.titles);
    const price = randomizer.getPositiveInteger(1000, 3000);
    const type = randomizer.getRandomValueFromArray(SEMPLE_DATA.types);
    const rooms = randomizer.getPositiveInteger(1, 5);
    const guests = randomizer.getPositiveInteger(1, 10);
    const checkin = `${randomizer.getPositiveInteger(12, 14)}:00`;
    const checkout = `${randomizer.getPositiveInteger(12, 14)}:00`;
    const features = randomizer.getRandomValuesFromArray(SEMPLE_DATA.features);
    const description = randomizer.getRandomValueFromArray(SEMPLE_DATA.descriptions);
    const photos = randomizer.getRandomValuesFromArray(SEMPLE_DATA.photos);
    const lat = randomizer.getPositiveFloat(35.65000, 35.70000, 5);
    const lng = randomizer.getPositiveFloat(139.70000, 139.80000, 5);
    const address = `${lat}, ${lng}`;

    const object = {
      author: {
        avatar: 'img/avatars/user10.png', // В рандомном объекте ссылка генерируется при итерации;
      },
      offer: {
        title: title,
        address: address,
        price: price,
        type: type,
        rooms: rooms,
        guests: guests,
        checkin: checkin,
        checkout: checkout,
        features: features,
        description: description,
        photos: photos,
      },
      location: {
        lat: lat,
        lng: lng
      }
    };
    return object;
  }

  createLinkForRandomAvatar(numberOfIteration) {
    const addZeroto = (number) => `0${number}`;
    if (numberOfIteration < 10) {
      addZeroto(numberOfIteration);
    }
    const avatarImgLink = `img/avatars/user${numberOfIteration}.png`;
    return avatarImgLink;
  }

  createArrayWithRandomDataObjects(howManyArraysDoYouNeed=10) {
    const arrWithObjects = [];
    for(let i = 1; i<=howManyArraysDoYouNeed; i++) {
      const obj = this.createRandomDataObject();
      obj.author.avatar = this.createLinkForRandomAvatar(i);
      arrWithObjects.push(obj);
    }
    return arrWithObjects;
  }
}

export { DataController };
