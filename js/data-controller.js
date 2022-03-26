import { randomizer } from './randomizer.js';
import { SEMPLE_DATA } from './data/semple-data.js';

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
    this.SEMPLE_DATA = SEMPLE_DATA;
  }

  createRandomDataObject() {
    this.SEMPLE_DATA =  SEMPLE_DATA;

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

    return {
      author: {
        avatar: 'img/avatars/default.png', // В рандомном объекте ссылка генерируется при итерации;
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
  }

  createLinkForRandomAvatar(numberOfIteration) {
    const addZeroTo = (number) => `0${number}`;
    if (numberOfIteration < 10) {
      numberOfIteration = addZeroTo(numberOfIteration);
    }
    return `img/avatars/user${numberOfIteration}.png`;
  }

  createArrayWithRandomDataObjects(howManyObjectsDoYouNeed=10) {
    const arrWithObjects = [];
    for(let i = 1; i<=howManyObjectsDoYouNeed; i++) {
      const obj = this.createRandomDataObject();
      obj.author.avatar = this.createLinkForRandomAvatar(i);
      arrWithObjects.push(obj);
    }
    return arrWithObjects;
  }
}

const dataController = new DataController();
const points = dataController.createArrayWithRandomDataObjects();

export { DataController, dataController, points };
