<template>
  <v-container class="section-main">
    <advert-filter></advert-filter>
    <v-layout column align-center class="map-layout">
      <GmapMap
        v-if="!loading"
        :center="mapConfig.center"
        :zoom="mapConfig.zoom"
        :map-type-id="mapConfig.type"
        class="main-map"
        ref="mapRef"
        @click="setLatLng"
        @center_changed="setNewCenter">
        <map-info-window></map-info-window>
        <advert-marker :key="index" v-for="(markerData, index) in getAdverts()" :markerData="markerData"></advert-marker>
        <advert-popup :latLng="latLng"></advert-popup>
      </GmapMap>
      <v-flex xs12 align-center d-flex class="text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          color="colorActive"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import AdvertPopup from '../AdvertPopup';
import AdvertMarker from './AdvertMarker';
import MapInfoWindow from './MapInfoWindow';
import AdvertFilter from './AdvertFilter';

export default {
  name: 'home',
  components: {
    AdvertPopup,
    AdvertMarker,
    MapInfoWindow,
    AdvertFilter,
  },
  mounted() {
    this.getCurrentLocation();
  },
  computed: {
    adverts() {
      return this.$store.getters.adverts.filter(
        advert => advert.status === 'active',
      );
    },
    filterAdvert() {
      return this.$store.getters.filterAdvert;
    },
    loading() {
      return this.$store.getters.loading;
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
      this.$store.commit('showAdvertPopup', true);
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
    getAdverts() {
      let result = this.adverts;
      Object.keys(this.filterAdvert).forEach(key => {
        if (this.filterAdvert[key] && this.filterAdvert[key] !== 'all') {
          switch (key) {
            case 'id_pet_color':
              result = result.filter(
                advert =>
                  this.filterAdvert[key].every(
                    color => advert[key].indexOf(color) >= 0,
                  )
                    ? advert
                    : false,
              );
              break;
            case 'radius':
              result = this.filterRadius(result);
              break;
            default:
              result = result.filter(
                advert => advert[key] === this.filterAdvert[key],
              );
              break;
          }
        }
      });
      return result;
    },
    filterRadius(adverts) {
      return adverts.filter(advert => {
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
.section-main {
  display: flex;
  flex-direction: column;
}
.main-map {
  width: 100%;
  height: 100%;
}
.map-layout {
  height: calc(100% - 202px);
}
</style>