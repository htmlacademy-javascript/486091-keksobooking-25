import {
  dataController
} from './data-controller.js';

import {
  AnnouncementCardTemplater
} from './announcement-card-templater.js';

let isMapActive = false;

const points = dataController.createArrayWithRandomDataObjects(1);

const map = L.map('map-canvas')
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
).addTo(map);

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

marker.addTo(map);

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  let { lat,lng } = coordinates;
  lat = Number(lat.toFixed(5));
  lng = Number(lng.toFixed(5));
  const formAddress = document.querySelector('#address');
  formAddress.value = `${lat}, ${lng}`;
});


const createMarker = (lat, lng, obj) => {
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
  newMarker.addTo(map).bindPopup(popUpCard);
};


points.forEach((obj) => {
  const {
    lat,
    lng
  } = obj.location;
  createMarker(lat, lng, obj);
});

export {
  map,
  isMapActive
};
