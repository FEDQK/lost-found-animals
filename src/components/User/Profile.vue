<i18n>
  {
    "en": {
      "title": "My adverts"
    },
    "ua": {
      "title": "Мої оголошення"
    },
    "ru": {
      "title": "Мои обявления"
    }
  }
</i18n>

<template>
  <section class="profile">
    <v-toolbar color="colorMain" class="toolbar">
      <v-toolbar-title class="title">{{$t('title')}}</v-toolbar-title>
    </v-toolbar>
    <adverts-list :style="{height: containerHeight + 'px'}" :advertsData="userAdverts"></adverts-list>
    <advert-popup></advert-popup>
  </section>
</template>

<script>
import AdvertsList from '../AdvertsList';
import AdvertPopup from '../AdvertPopup';

export default {
  name: 'profile',
  components: {
    AdvertsList,
    AdvertPopup,
  },
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
  methods: {},
};
</script>

<style scoped>
.profile {
  height: 100%;
}
.toolbar {
  height: 56px;
}
.title {
  color: #fff;
}
</style>
