<i18n>
  {
    "en": {
      "map": "Map",
      "authorization": "Authorization",
      "profile": "Profile",
      "moderation": "Moderation",
      "ua": "Український",
      "ru": "Русский",
      "en": "English"
    },
    "ua": {
      "map": "Карта",
      "authorization": "Авторизація",
      "profile": "Профіль",
      "moderation": "Модерація",
      "ua": "Український",
      "ru": "Русский",
      "en": "English"
    },
    "ru": {
      "map": "Карта",
      "authorization": "Авторизация",
      "profile": "Профиль",
      "moderation": "Модерация",
      "ua": "Український",
      "ru": "Русский",
      "en": "English"
    }
  }
</i18n>

<template>
  <v-bottom-nav :value="true" class="main-menu" color="colorMain">
    <v-select
      class="lang-selector"
      :items="languages"
      v-model="locale"
      hide-details
      hide-selected
      color="colorActive"
      prepend-icon="language"
      :dark="true"
    ></v-select>
    <v-layout justify-center>
      <v-btn
        v-for="(item, index) in navigationMenu"
        :to="item.path"
        :key="index"
        exact>
        <span class="white--text">{{ $t(item.title) }}</span>
        <v-icon class="white--text">{{ item.icon }}</v-icon>
      </v-btn>
    </v-layout>
    <v-btn v-show="user" class="logout" @click="onLogout">
      <v-icon class="white--text" >
        exit_to_app
      </v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isModerator() {
      return this.user && this.user.role === 'moderator';
    },
    navigationMenu() {
      const navigationMenu = this.$store.getters.navigationMenu;
      if (this.isModerator) {
        return this.addModerationTab(navigationMenu);
      }
      return navigationMenu;
    },
    locale: {
      get() {
        return this.$store.getters.locale;
      },
      set(newLocale) {
        this.$root.$i18n.locale = newLocale;
        this.$store.dispatch('updateLocale', newLocale);
      },
    },
    languages() {
      return this.$store.getters.languages.map(languageObj => ({
        value: languageObj.value,
        text: this.$t(languageObj.text),
      }));
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    addModerationTab(navigationMenu) {
      return [
        ...navigationMenu,
        {
          path: '/moderation',
          title: 'moderation',
          icon: 'playlist_add_check',
        },
      ];
    },
  },
};
</script>

<style scoped>
.lang-selector {
  max-width: 145px;
  padding: 0 0 0 10px;
}

.lang-selector >>> .input-group__append-icon,
.lang-selector >>> .input-group__details {
  display: none;
}

.logout {
  width: auto;
}
</style>