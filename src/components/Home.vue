<template>
  <v-container>
    <advert-filter></advert-filter>
    <GmapMap
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      :map-type-id="mapConfig.type"
      class="main-map"
      ref="mapRef"
      @click="setLatLng"
      @center_changed="setNewCenter">
      <map-info-window></map-info-window>
      <advert-marker :key="index" v-for="(markerData, index) in getAdvertsData()" :markerData="markerData"></advert-marker>
      <marker-popup :latLng="latLng"></marker-popup>
    </GmapMap>
  </v-container>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import MarkerPopup from './MarkerPopup';
import AdvertMarker from './AdvertMarker';
import MapInfoWindow from './MapInfoWindow';
import AdvertFilter from './AdvertFilter';

export default {
  name: 'home',
  components: {
    MarkerPopup,
    AdvertMarker,
    MapInfoWindow,
    AdvertFilter,
  },
  mounted() {
    this.getCurrentLocation();
  },
  computed: {
    advertsData() {
      return this.$store.getters.advertsData;
    },
    filterAdvert() {
      return this.$store.getters.filterAdvert;
    },
    google: gmapApi,
  },
  data() {
    return {
      latLng: null,
      mapConfig: {
        center: {
          lat: 49.396675075193976,
          lng: 31.541748046875,
        },
        zoom: 6,
        type: 'roadmap',
        dynamicCenter: {
          lat: 49.396675075193976,
          lng: 31.541748046875,
        },
      },
    };
  },
  methods: {
    setLatLng(event) {
      this.latLng = event.latLng;
      this.$store.commit('showMarkerPopup', true);
    },
    setNewCenter(event) {
      this.mapConfig.dynamicCenter.lat = event.lat();
      this.mapConfig.dynamicCenter.lng = event.lng();
    },
    getDistanceBetween(markerPosition) {
      const center = {
        lat: () => this.mapConfig.dynamicCenter.lat,
        lng: () => this.mapConfig.dynamicCenter.lng,
      };
      const marker = {
        lat: () => markerPosition.lat,
        lng: () => markerPosition.lng,
      };
      return this.google.maps.geometry.spherical.computeDistanceBetween(
        center,
        marker,
      );
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setNewCenterPosition);
      } else {
        /* eslint-disable no-alert */
        alert('Geolocation is not supported by this browser.');
      }
    },
    setNewCenterPosition(position) {
      this.mapConfig.zoom = 12;
      this.mapConfig.center.lat = position.coords.latitude;
      this.mapConfig.dynamicCenter.lat = position.coords.latitude;
      this.mapConfig.center.lng = position.coords.longitude;
      this.mapConfig.dynamicCenter.lng = position.coords.longitude;
    },
    getAdvertsData() {
      let result = this.advertsData;
      Object.keys(this.filterAdvert).forEach(key => {
        if (this.filterAdvert[key]) {
          switch (key) {
            case 'animalColor':
              result = result.filter(advert => {
                if (
                  this.filterAdvert[key].every(
                    color => advert.advertInfo[key].indexOf(color) >= 0,
                  )
                ) {
                  return advert;
                }
                return false;
              });
              break;
            case 'radius':
              result = this.filterRadius(result);
              break;
            default:
              result = result.filter(
                advert => advert.advertInfo[key] === this.filterAdvert[key],
              );
              break;
          }
        }
      });
      return result;
    },
    filterRadius(advertsData) {
      return advertsData.filter(advert => {
        if (
          this.getDistanceBetween(advert.position) / 1000 <=
          Number(this.filterAdvert.radius)
        ) {
          return advert;
        }
        return false;
      });
    },
  },
};
</script>

<style scoped>
.main-map {
  width: 100%;
  height: 75%;
}
</style>