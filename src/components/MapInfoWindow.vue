<template>
  <gmap-info-window :options="infoWindowOptions" :position="infoWindow.position" :opened="infoWindow.isOpen" @closeclick="onCloseInfoWindow" v-if="infoWindow.isOpen">
    <v-card>
      <v-card-media class="advert-photo" :src="infoWindow.photoUrl" height="200px" contain>
      </v-card-media>
      <v-card-text class="info-window-text">
        <span>Тип маркера:</span> {{nameTypeMarker}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <span>Вид тварини:</span> {{namePetTypes}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <span>Порода тварини:</span> {{namePetBreeds}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <span>Вік тварини:</span> {{infoWindow.petAge}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <span>Кольори тварини:</span> {{namePetColors}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <span>Окрас тварини:</span> {{namePetColorings}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <span>Контактна інформація:</span> {{infoWindow.contactInfo}}
      </v-card-text>
      <v-card-actions class="form-buttons">
        <v-layout justify-center>
            <v-btn color="info" depressed @click="onEditAdvert">Редагувати</v-btn>
            <v-btn color="error" depressed @click="onDeleteAdvert">Видалити</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </gmap-info-window>
</template>

<script>
export default {
  name: 'map-info-window',
  computed: {
    infoWindow() {
      return this.$store.getters.infoWindow;
    },
    locale() {
      return this.$store.getters.locale;
    },
    nameTypeMarker() {
      return this.infoWindow.typeMarker === 'find' ? 'Знайдено' : 'Загублено';
    },
    namePetTypes() {
      return this.$store.getters.namePetTypes(this.infoWindow.id_pet_type);
    },
    namePetBreeds() {
      return this.$store.getters.namePetBreeds(this.infoWindow.id_pet_breed);
    },
    namePetColors() {
      return this.$store.getters.namePetColors(this.infoWindow.id_pet_color);
    },
    namePetColorings() {
      return this.$store.getters.namePetColorings(
        this.infoWindow.id_pet_coloring,
      );
    },
  },
  data() {
    return {
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -40,
        },
        maxWidth: 350,
      },
    };
  },
  methods: {
    onCloseInfoWindow() {
      this.$store.dispatch('updateInfoWindow', { isOpen: false });
    },
    onDeleteAdvert() {
      this.onCloseInfoWindow();
      this.$store.dispatch('deleteAdvert', this.infoWindow.id);
    },
    onEditAdvert() {
      this.onCloseInfoWindow();
      this.$store.dispatch('editAdvert', this.infoWindow);
      this.$bus.$emit('editAdvert');
      this.$store.commit('showMarkerPopup', true);
    },
  },
};
</script>

<style scoped>
.info-window-text {
  padding: 5px;
}
.info-window-text > span {
  font-weight: bold;
}
</style>
