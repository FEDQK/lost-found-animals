<template>
  <gmap-info-window :options="infoWindowOptions" :position="infoWindow.position" :opened="infoWindow.isOpen" @closeclick="onCloseInfoWindow" v-if="infoWindow.content">
    <v-card>
        <v-card-media class="advert-photo" :src="infoWindow.content.photoUrl" height="200px" contain>
        </v-card-media>
        <v-card-text class="info-window-text">
          <span>Тип маркера:</span> {{nameTypeMarker}}
        </v-card-text>
        <v-card-text class="info-window-text">
          <span>Вид тварини:</span> {{nameAnimalTypes}}
        </v-card-text>
        <v-card-text class="info-window-text">
          <span>Порода тварини:</span> {{nameAnimalBreeds}}
        </v-card-text>
        <v-card-text class="info-window-text">
          <span>Вік тварини:</span> {{infoWindow.content.animalAge}}
        </v-card-text>
        <v-card-text class="info-window-text">
          <span>Кольори тварини:</span> {{nameAnimalColors}}
        </v-card-text>
        <v-card-text class="info-window-text">
          <span>Окрас тварини:</span> {{nameAnimalColorings}}
        </v-card-text>
        <v-card-text class="info-window-text">
          <span>Контактна інформація:</span> {{infoWindow.content.contactInfo}}
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
    nameTypeMarker() {
      return this.infoWindow.content.typeMarker === 'find' ? 'Знайдено' : 'Загублено';
    },
    nameAnimalTypes() {
      return this.$store.getters.nameAnimalTypes(this.infoWindow.content.animalType).text;
    },
    nameAnimalBreeds() {
      return this.$store.getters.nameAnimalBreeds(
        this.infoWindow.content.animalBreed, this.infoWindow.content.animalType).text;
    },
    nameAnimalColors() {
      return this.$store.getters.nameAnimalColors(this.infoWindow.content.animalColor);
    },
    nameAnimalColorings() {
      return this.$store.getters.nameAnimalColorings(this.infoWindow.content.animalColoring).text;
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
      this.$store.dispatch('deleteAdvert', this.infoWindow.markerId);
    },
    onEditAdvert() {
      this.onCloseInfoWindow();
      this.$store.dispatch('editAdvert', { id: this.infoWindow.markerId, advertInfo: this.infoWindow.content });
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
