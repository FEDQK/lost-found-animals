<i18n>
  {
    "en": {
      "find": "Found",
      "lost": "Lost",
      "saw": "Saw",
      "dateCreate": "Date of creation:",
      "typeMarker": "Marker Type:",
      "petType": "Kind of pet:",
      "petBreed": "Pet Breed:",
      "petAge": "Pet Age:",
      "petColor": "Pet color:",
      "petColoring": "Pet coloring:",
      "contactInfo": "Contact Information:",
      "buttonEditAdvert": "Edit",
      "buttonDeleteAdvert": "Delete"
    },
    "ua": {
      "find": "Знайдено",
      "lost": "Загублено",
      "saw": "Побачено",
      "dateCreate": "Дата створення:",
      "typeMarker": "Тип маркера:",
      "petType": "Вид тварини:",
      "petBreed": "Порода тварини:",
      "petAge": "Вік тварини:",
      "petColor": "Колір тварини:",
      "petColoring": "Окрас тварини:",
      "contactInfo": "Контактна інформація:",
      "buttonEditAdvert": "Редагувати",
      "buttonDeleteAdvert": "Видалити"
    },
    "ru": {
      "find": "Найдено",
      "lost": "Потеряно",
      "saw": "Увидено",
      "dateCreate": "Дата создания:",
      "typeMarker": "Тип маркера:",
      "petType": "Вид животного:",
      "petBreed": "Порода животного:",
      "petAge": "Возраст животного:",
      "petColor": "Цвет животного:",
      "petColoring": "Окрас животного:",
      "contactInfo": "Контактная информация:",
      "buttonEditAdvert": "Редактировать",
      "buttonDeleteAdvert": "Удалить"
    }
  }
</i18n>

<template>
  <gmap-info-window :options="infoWindowOptions" :position="infoWindow.position" :opened="infoWindow.isOpen" @closeclick="onCloseInfoWindow" v-if="infoWindow.isOpen">
    <v-card>
      <v-card-media class="advert-photo" :src="infoWindow.photoUrl" :height="getSizeImage" contain>
      </v-card-media>
      <v-card-text class="info-window-text">
        <b>{{$t('typeMarker')}}</b> {{$t(infoWindow.typeMarker)}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <b>{{$t('petType')}}</b> {{namePetTypes}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <b>{{$t('petBreed')}}</b> {{namePetBreeds}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <b>{{$t('petAge')}}</b> {{namePetAges}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <b>{{$t('petColor')}}</b> {{namePetColors}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <b>{{$t('petColoring')}}</b> {{namePetColorings}}
      </v-card-text>
      <v-card-text class="info-window-text">
        <b>{{$t('contactInfo')}}</b> {{infoWindow.contactInfo}}
      </v-card-text>
      <v-card-text class="date-create">
        <v-icon color="colorMain" size="22">access_time</v-icon> <span>{{`${getDate(infoWindow.dateCreate)}, ${getTime(infoWindow.dateCreate)}`}}</span>
      </v-card-text>
      <v-card-actions class="form-buttons" v-if="checkUser">
        <v-layout justify-center>
          <v-btn color="info" depressed @click="onEditAdvert">{{$t('buttonEditAdvert')}}</v-btn>
          <v-btn color="error" depressed @click="onDeleteAdvert">{{$t('buttonDeleteAdvert')}}</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </gmap-info-window>
</template>

<script>
export default {
  name: 'map-info-window',
  computed: {
    user() {
      return this.$store.getters.user;
    },
    infoWindow() {
      return this.$store.getters.infoWindow;
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
    namePetAges() {
      return this.$store.getters.namePetAges(this.infoWindow.id_pet_age);
    },
    checkUser() {
      return (
        this.user &&
        (this.user.id === this.infoWindow.id_user || this.user.role === 'admin')
      );
    },
    getSizeImage() {
      if (window.innerWidth < 450) {
        return '100px';
      }
      return '200px';
    },
  },
  data() {
    return {
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -45,
        },
      },
    };
  },
  methods: {
    onCloseInfoWindow() {
      this.$store.dispatch('updateInfoWindow', { isOpen: false });
    },
    onDeleteAdvert() {
      this.onCloseInfoWindow();
      this.$store.dispatch('deleteAdvert', this.infoWindow);
    },
    onEditAdvert() {
      this.onCloseInfoWindow();
      this.$store.dispatch('editAdvert', this.infoWindow);
      this.$bus.$emit('editAdvert');
      this.$store.commit('showAdvertPopup', true);
    },
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getTime(date) {
      return new Date(date).toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
.info-window-text {
  padding: 5px;
}
.info-window-text > b {
  font-weight: bold;
}
.date-create {
  display: flex;
  align-items: center;
  padding: 0;
}
.date-create > span {
  padding-left: 5px;
  font-size: 12px;
}
.form-buttons {
  padding: 4px 0;
}
</style>
