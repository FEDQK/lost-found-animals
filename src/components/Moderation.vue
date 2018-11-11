<i18n>
  {
    "en": {
      "title": "Moderation adverts"
    },
    "ua": {
      "title": "Оголошення на модерації"
    },
    "ru": {
      "title": "Объявления на модерации"
    }
  }
</i18n>

<template>
  <section class="moderation">
    <v-toolbar color="colorMain" class="toolbar">
      <v-toolbar-title class="title">{{$t('title')}}</v-toolbar-title>
    </v-toolbar>
    <adverts-list :style="{height: containerHeight + 'px'}" :isModeration="true" :advertsData="moderationAdverts"></adverts-list>
  </section>
</template>

<script>
import AdvertsList from './AdvertsList';

export default {
  name: 'moderation',
  components: {
    AdvertsList,
  },
  data() {
    return {};
  },
  computed: {
    moderationAdverts() {
      return this.$store.getters.moderationAdverts;
    },
    containerHeight() {
      return window.innerHeight - 112;
    },
  },
  methods: {},
};
</script>

<style scoped>
.moderation {
  height: 100%;
}
.toolbar {
  height: 56px;
}
.title {
  color: #fff;
}
</style>