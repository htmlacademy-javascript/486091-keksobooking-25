import {MAIN_COORDINATES} from '../../settings/main-coordinates.js';
import {SIMILAR_ANNOUNCEMENT_COUNT} from '../../settings/similar-announcement-count.js';
import {MAP_ZOOM} from '../../settings/map-zoom.js';
import {AdvertisementCardTemplater} from '../../helpers/advertisement-card-templater.js';

class Map { // Класс отвечающий за отрисовку Leaflet и показ меток похожих объявлений
  init(mapId = 'map-canvas') {
    this.map = L.map(mapId)
      .on('load', () => {})
      .setView(MAIN_COORDINATES, MAP_ZOOM);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    this.markerGroup = L.layerGroup().addTo(this.map);
  }

  setDefaultData(points) {
    this.defaultData = points.slice(0, SIMILAR_ANNOUNCEMENT_COUNT);
    this.points = points.slice(0, SIMILAR_ANNOUNCEMENT_COUNT);
  }

  setData(points) {
    this.points = points.slice(0, SIMILAR_ANNOUNCEMENT_COUNT);
  }

  createMainMarker() {
    const mainPinIcon = L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [0, 0],
    });

    const marker = L.marker(MAIN_COORDINATES, {
      draggable: true,
      icon: mainPinIcon,
    },);

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
    },);

    const createPopUpCard = () => new AdvertisementCardTemplater(obj);
    const popUpCard = createPopUpCard(obj);
    newMarker.addTo(this.markerGroup).bindPopup(popUpCard);
  }

  fillByPoints() {
    this.points.forEach((obj) => {
      const { lat, lng } = obj.location;
      this.createMarker(lat, lng, obj);
    });
  }

  fillByDefault() {
    this.defaultData.forEach((obj) => {
      const {
        lat,
        lng
      } = obj.location;
      this.createMarker(lat, lng, obj);
    });
  }

  fillFormAddress() {
    let {lat, lng} = MAIN_COORDINATES;
    lat = Number(lat.toFixed(5));
    lng = Number(lng.toFixed(5));

    const formAddress = document.querySelector('#address');
    formAddress.value = `${lat}, ${lng}`;
  }

  reset() {
    this.markerGroup.clearLayers();
    this.map.setView(MAIN_COORDINATES, MAP_ZOOM);
    this.fillByDefault();
    this.resetMainMarker();
    this.createMainMarker();
    this.fillFormAddress();
  }
}

export const map = new Map();
