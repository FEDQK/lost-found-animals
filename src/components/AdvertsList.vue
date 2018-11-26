<i18n>
  {
    "en": {
      "buttonUpdateAdvert": "Update",
      "buttonDeleteAdvert": "Delete",
      "buttonApproveAdvert": "To approve",
      "buttonRejectAdvert": "Reject"
    },
    "ua": {
      "buttonUpdateAdvert": "Оновити",
      "buttonDeleteAdvert": "Видалити",
      "buttonApproveAdvert": "Схвалити",
      "buttonRejectAdvert": "Відхилити"
    },
    "ru": {
      "buttonUpdateAdvert": "Обновить",
      "buttonDeleteAdvert": "Удалить",
      "buttonApproveAdvert": "Одобрить",
      "buttonRejectAdvert": "Отклонить"
    }
  }
</i18n>

<template>
  <v-container class="scroll-y adverts-container">
    <v-layout style="height: auto;">
      <v-flex>
        <advert v-for="(advert) in advertsData" :key="advert.id" :advertData="advert">
          <v-card-actions class="advert-buttons">
            <v-layout justify-start v-if="isModeration">
              <v-flex>
                <v-btn color="info" depressed @click="onApproveAdvert(advert.id)">{{ $t('buttonApproveAdvert') }}</v-btn>
                <v-btn color="error" depressed @click="onRejectAdvert(advert.id)">{{ $t('buttonRejectAdvert') }}</v-btn>
              </v-flex>
            </v-layout>
            <v-layout justify-start v-else>
              <v-flex>
                <v-btn color="info" depressed @click="onOpenEditPopup(advert)">{{ $t('buttonUpdateAdvert') }}</v-btn>
                <v-btn color="error" depressed @click="onDeleteAdvert(advert)">{{ $t('buttonDeleteAdvert') }}</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </advert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Advert from './Advert';

export default {
  name: 'adverts-list',
  components: {
    Advert,
  },
  data() {
    return {};
  },
  props: {
    advertsData: {
      type: Array,
    },
    isModeration: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    onClosePopup() {
      this.$store.dispatch('updateInfoWindow', { isOpen: false });
    },
    onOpenEditPopup(advert) {
      this.$store.dispatch('editAdvert', advert);
      this.$bus.$emit('editAdvert');
      this.$store.commit('showAdvertPopup', true);
    },
    onDeleteAdvert(advert) {
      this.onClosePopup();
      this.$store.dispatch('deleteAdvert', advert);
    },
    onApproveAdvert(id) {
      this.$store.dispatch('updateAdvert', { id, status: 'active' });
    },
    onRejectAdvert(id) {
      this.$store.dispatch('updateAdvert', { id, status: 'rejected' });
    },
  },
};
</script>

<style scoped>
.adverts-container::-webkit-scrollbar-track {
  background-color: #fafafa;
}

.adverts-container::-webkit-scrollbar {
  width: 5px;
}

.adverts-container::-webkit-scrollbar-thumb {
  background-color: #292d33;
}
</style>