import {
  dataController
} from './data-controller.js';

import {
  AnnouncementCardTemplater
} from './announcement-card-templater.js';

let isMapActive = false;

class Map {
  constructor(mapId) {
    this.mapInit(mapId);
    this.setMapData();
    this.createMainMarker();
    this.fillMapByPoints();
  }

  mapInit(mapId = 'map-canvas') {
    this.map = L.map(mapId)
      .on('load', () => {
        isMapActive = true;
      })
      .setView({
        lat: 35.6895000,
        lng: 139.6917100,
      }, 10);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);
  }

  setMapData() {
    this.points = dataController.createArrayWithRandomDataObjects(5);
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
    newMarker.addTo(this.map).bindPopup(popUpCard);
  }

  fillMapByPoints() {
    this.points.forEach((obj) => {
      const {
        lat,
        lng
      } = obj.location;
      this.createMarker(lat, lng, obj);
    });
  }
}

const map = new Map();
export {
  map,
  Map,
  isMapActive
};
