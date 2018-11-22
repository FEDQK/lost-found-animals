<template>
  <div>
    <gmap-polyline v-if="markerData.previousPosition" :path="polylinePath" :options="polylineOptions" :editable="false"></gmap-polyline>
    <GmapMarker
      :position="markerData.position"
      :clickable="true"
      :icon="getMarkerImage()"
      @click="toggleInfoWindow"/>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import markerCatLost from '../../assets/marker-cat-lost.png';
import markerCatFound from '../../assets/marker-cat-found.png';
import markerCatSaw from '../../assets/marker-cat-saw.png';
import markerDogLost from '../../assets/marker-dog-lost.png';
import markerDogFound from '../../assets/marker-dog-found.png';
import markerDogSaw from '../../assets/marker-dog-saw.png';
import markerParrotLost from '../../assets/marker-parrot-lost.png';
import markerParrotFound from '../../assets/marker-parrot-found.png';
import markerParrotSaw from '../../assets/marker-parrot-saw.png';

export default {
  name: 'advert-marker',
  props: {
    markerData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.lineSymbol = {
      path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };
  },
  computed: {
    polylinePath() {
      return [this.markerData.previousPosition, this.markerData.position];
    },
    polylineOptions() {
      return {
        strokeColor: this.$vuetify.theme.colorActive,
        icons: [
          {
            icon: this.lineSymbol,
            offset: '100%',
          },
        ],
      };
    },
    petTypes() {
      return this.$store.getters.petTypes;
    },
  },
  data() {
    return {
      google: gmapApi(),
      lineSymbol: null,
      markerImages: {
        cat: {
          lost: markerCatLost,
          find: markerCatFound,
          saw: markerCatSaw,
        },
        dog: {
          lost: markerDogLost,
          find: markerDogFound,
          saw: markerDogSaw,
        },
        parrot: {
          lost: markerParrotLost,
          find: markerParrotFound,
          saw: markerParrotSaw,
        },
      },
    };
  },
  methods: {
    toggleInfoWindow() {
      this.$store.dispatch('updateInfoWindow', this.markerData);
    },
    getNamePetType() {
      if (this.petTypes.length > 0) {
        return this.petTypes.find(
          dataPetType => dataPetType.id === this.markerData.id_pet_type,
        ).en.name;
      }
      return '';
    },
    getMarkerImage() {
      const namePetType = this.getNamePetType().toLowerCase();
      if (namePetType.length > 0) {
        return this.markerImages[namePetType][this.markerData.typeMarker];
      }
      return '';
    },
  },
};
</script>