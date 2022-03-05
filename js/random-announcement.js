import {randomizer} from './randomizer.js';
import {SEMPLE_DATA} from './data.js';

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

const createArrayWithDataObjects = (count = 10) => {
  const arrWithObjects = [];
  for (let i = 1; i <=count; i++) {
    const obj = new RandomAnnouncement(i);
    arrWithObjects.push(obj.getNewObjectWithSempleData());
  }
  return arrWithObjects;
};

export {createArrayWithDataObjects};
