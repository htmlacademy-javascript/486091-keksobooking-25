import {
  MAIN_COORDINATES
} from './data/main-coordinates.js';

import {
  AnnouncementCardTemplater
} from './announcement-card-templater.js';

class Map {
  constructor() {
    this.formDisActivation('.ad-form');
    this.formDisActivation('.map__filters');
    //this.init();
    this.SIMILAR_ANNOUNCEMENT_COUNT = 10;
    //this.createMainMarker();
    //this.setMapData();

    //this.fillMapByPoints();
  }

  init(mapId = 'map-canvas') {
    this.map = L.map(mapId)
      .on('load', () => {
        //this.formActivation('.ad-form');
        //this.formActivation('.map__filters');
        //this.fillFormAddress();
      })
      .setView(MAIN_COORDINATES, 12);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    this.markerGroup = L.layerGroup().addTo(this.map);
  }

  setData(points) {
    this.points = points.slice(0, this.SIMILAR_ANNOUNCEMENT_COUNT);
  }

  createMainMarker() {
    const mainPinIcon = L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [0, 0],
    });

    const marker = L.marker({
      lat: 35.68950,
      lng: 139.69171,
    }, {
      draggable: true,
      icon: mainPinIcon,
    }, );

    marker.addTo(this.map);

    marker.on('moveend', (evt) => {
      const coordinates = evt.target.getLatLng();
      let {
        lat,
        lng
      } = coordinates;
      lat = Number(lat.toFixed(5));
      lng = Number(lng.toFixed(5));
      const formAddress = document.querySelector('#address');
      formAddress.value = `${lat}, ${lng}`;
    });
    this.mainMarker = marker;
  }

  resetMainMarker() {
    const marker = this.mainMarker;
    marker.remove();

  }

  createMarker(lat, lng, obj) {


    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const newMarker = L.marker({
      lat,
      lng,
    }, {
      icon,
    }, );

    const createPopUpCard = () => new AnnouncementCardTemplater(obj);
    const popUpCard = createPopUpCard(obj);
    newMarker.addTo(this.markerGroup).bindPopup(popUpCard);
  }

  fillByPoints() {
    this.points.forEach((obj) => {
      const {
        lat,
        lng
      } = obj.location;
      this.createMarker(lat, lng, obj);
    });
  }

  fillFormAddress() {
    let { lat, lng } = MAIN_COORDINATES;


    lat = Number(lat.toFixed(5));
    lng = Number(lng.toFixed(5));
    const formAddress = document.querySelector('#address');
    formAddress.value = `${lat}, ${lng}`;
  }

  formActivation(formSelector) {
    const form = document.querySelector(formSelector);

    if (form.classList.contains('ad-form')) {
      form.classList.remove('ad-form--disabled');
    }
    if (form.classList.contains('map__filters')) {
      form.classList.remove('map__filters--disabled');
    }
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      element.disabled = false;
    }
  }

  formDisActivation(formSelector) {
    const form = document.querySelector(formSelector);

    if (form.classList.contains('ad-form')) {
      form.classList.add('ad-form--disabled');
    }
    if (form.classList.contains('map__filters')) {
      form.classList.add('map__filters--disabled');
    }
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      element.disabled = true;
    }
  }
}

export const map = new Map();
