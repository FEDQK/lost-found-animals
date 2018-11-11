<i18n>
  {
    "en": {
      "advertDate": "Date of creation:",
      "advertStatus": "Status:",
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
      "active": "Approved",
      "rejected": "Rejected",
      "moderation": "On moderation",
      "buttonEditAdvert": "Edit",
      "buttonDeleteAdvert": "Delete"
    },
    "ua": {
      "advertDate": "Дата створення:",
      "advertStatus": "Статус:",
      "find": "Знайдено",
      "lost": "Загублено",
      "typeMarker": "Тип маркера:",
      "petType": "Вид тварини:",
      "petBreed": "Порода тварини:",
      "petAge": "Вік тварини:",
      "petAgeSuffix": "р.",
      "petColor": "Колір тварини:",
      "petColoring": "Окрас тварини:",
      "contactInfo": "Контактна інформація:",
      "active": "Доданий",
      "rejected": "Відхилено",
      "moderation": "На модерації",
      "buttonEditAdvert": "Редагувати",
      "buttonDeleteAdvert": "Видалити"
    },
    "ru": {
      "advertDate": "Дата создания:",
      "advertStatus": "Статус:",
      "find": "Найдено",
      "lost": "Потеряно",
      "typeMarker": "Тип маркера:",
      "petType": "Вид животного:",
      "petBreed": "Порода животного:",
      "petAge": "Возраст животного:",
      "petAgeSuffix": "г.",
      "petColor": "Цвет животного:",
      "petColoring": "Окрас животного:",
      "contactInfo": "Контактная информация:",
      "active": "Добавлен",
      "rejected": "Отклонен",
      "moderation": "На модерации",
      "buttonEditAdvert": "Редактировать",
      "buttonDeleteAdvert": "Удалить"
    }
  }
</i18n>

<template>
  <v-card class="advert">
    <v-card-media class="advert-photo" height="200" :src="advertData.photoUrl" contain></v-card-media>
    <section class="advert-data">
      <v-card-text class="advert-data-detail">
        <span><b>{{$t('advertDate')}}</b> {{getDate(advertData.dateCreate)}}</span>
        <span :class="advertData.status"><b>{{$t('advertStatus')}}</b> {{$t(advertData.status)}}</span>
      </v-card-text>
      <v-card-text><b>{{$t('typeMarker')}}</b> {{$t(advertData.typeMarker)}}</v-card-text>
      <v-card-text><b>{{$t('petType')}}</b> {{namePetType(advertData.id_pet_type)}}</v-card-text>
      <v-card-text><b>{{$t('petBreed')}}</b> {{namePetBreed(advertData.id_pet_breed)}}</v-card-text>
      <v-card-text><b>{{$t('petAge')}}</b> {{`${advertData.petAge} ${$t('petAgeSuffix')}`}}</v-card-text>
      <v-card-text><b>{{$t('petColor')}}</b> {{namePetColor(advertData.id_pet_color)}}</v-card-text>
      <v-card-text><b>{{$t('petColoring')}}</b> {{namePetColoring(advertData.id_pet_coloring)}}</v-card-text>
      <v-card-text><b>{{$t('contactInfo')}}</b> {{advertData.contactInfo}}</v-card-text>
      <slot></slot>
    </section>
  </v-card>
</template>

<script>
export default {
  name: 'advert',
  data() {
    return {};
  },
  props: {
    advertData: {
      type: Object,
    },
  },
  computed: {},
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
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.advert {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.advert-photo {
  width: 40%;
}
.advert-data {
  width: 100%;
  padding: 0 2%;
}
.advert-data >>> .card__text {
  padding: 5px;
}
.advert-data-detail {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.85em;
}
.advert-data-detail.card__text {
  padding: 5px 5px 10px;
}
.advert-data-detail b {
  color: #000;
}
.advert-data-detail span {
  color: #757575;
}
.advert-data-detail .active {
  color: #00c853;
}
.advert-data-detail .rejected {
  color: #ed3838;
}
</style>