<i18n>
  {
    "en": {
      "find": "Found",
      "lost": "Lost",
      "typeMarker": "Marker Type:",
      "petType": "Kind of pet:",
      "petBreed": "Pet Breed:",
      "petAge": "Pet Age:",
      "petAgeSuffix": "yr",
      "petColor": "Pet color:",
      "petColoring": "Pet coloring:",
      "contactInfo": "Contact Information:",
      "buttonEditAdvert": "Edit",
      "buttonDeleteAdvert": "Delete"
    },
    "ua": {
      "find": "Знайдено",
      "lost": "Загублено",
      "typeMarker": "Тип маркера:",
      "petType": "Вид тварини:",
      "petBreed": "Порода тварини:",
      "petAge": "Вік тварини:",
      "petAgeSuffix": "рік",
      "petColor": "Колір тварини:",
      "petColoring": "Окрас тварини:",
      "contactInfo": "Контактна інформація:",
      "buttonEditAdvert": "Редагувати",
      "buttonDeleteAdvert": "Видалити"
    },
    "ru": {
      "find": "Найдено",
      "lost": "Потеряно",
      "typeMarker": "Тип маркера:",
      "petType": "Вид животного:",
      "petBreed": "Порода животного:",
      "petAge": "Возраст животного:",
      "petAgeSuffix": "год",
      "petColor": "Цвет животного:",
      "petColoring": "Окрас животного:",
      "contactInfo": "Контактная информация:",
      "buttonEditAdvert": "Редактировать",
      "buttonDeleteAdvert": "Удалить"
    }
  }
</i18n>

<template>
  <section class="profile">
    <v-toolbar color="main">
      <v-toolbar-title class="title">Мои обявления</v-toolbar-title>
    </v-toolbar>
    <v-container class="scroll-y adverts-container">
      <v-layout style="height: auto;">
        <v-flex>
          <v-card v-for="(advert) in userAdverts" :key="advert.id" class="advert">
            <v-card-media class="advert-photo" height="200" :src="advert.photoUrl" contain></v-card-media>
            <section class="advert-data">
              <v-card-text><b>{{$t('typeMarker')}}</b> {{$t(advert.typeMarker)}}</v-card-text>
              <v-card-text><b>{{$t('petType')}}</b> {{namePetType(advert.id_pet_type)}}</v-card-text>
              <v-card-text><b>{{$t('petBreed')}}</b> {{namePetBreed(advert.id_pet_breed)}}</v-card-text>
              <v-card-text><b>{{$t('petAge')}}</b> {{`${advert.petAge} ${$t('petAgeSuffix')}`}}</v-card-text>
              <v-card-text><b>{{$t('petColor')}}</b> {{namePetColor(advert.id_pet_color)}}</v-card-text>
              <v-card-text><b>{{$t('petColoring')}}</b> {{namePetColoring(advert.id_pet_coloring)}}</v-card-text>
              <v-card-text><b>{{$t('contactInfo')}}</b> {{advert.contactInfo}}</v-card-text>
            </section>
          </v-card>
        </v-flex>
        
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {};
  },
  computed: {
    userAdverts() {
      return this.$store.getters.userAdverts;
    },
    containerHeight() {
      return window.innerHeight - 112;
    },
  },
  methods: {
    namePetType(id) {
      return this.$store.getters.namePetTypes(id);
    },
    namePetBreed(id) {
      return this.$store.getters.namePetBreeds(id);
    },
    namePetColor(id) {
      return this.$store.getters.namePetColors(id);
    },
    namePetColoring(id) {
      return this.$store.getters.namePetColorings(id);
    },
  },
};
</script>

<style scoped>
.profile {
  height: 100%;
}
.title {
  color: #fff;
}
.adverts-container::-webkit-scrollbar-track {
  background-color: #fafafa;
}

.adverts-container::-webkit-scrollbar {
  width: 5px;
}

.adverts-container::-webkit-scrollbar-thumb {
  background-color: #292d33;
}
.advert {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.advert-photo {
  width: 60%;
}
.advert-data >>> .card__text {
  padding: 5px;
}
</style>
