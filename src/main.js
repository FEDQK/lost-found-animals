// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import 'vuetify/dist/vuetify.min.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App';
import AuthService from './services/AuthService';
import store from './store';
import router from './router';
import Alert from './components/Shared/Alert';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    main: '#292d33',
    active: '#24abeb',
    good: '#00c853',
    bad: '#ed3838',
  },
});

Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'geometry, places',
    key: 'AIzaSyDzVu6xPSu-1otbwW54WrDBFyLqWT1u5uY',
  },
});

Vue.use(VueI18n);
Vue.component('app-alert', Alert);

const EventBus = new Vue();
const i18n = new VueI18n({
  locale: store.getters.locale,
  fallbackLocale: 'en',
  messages: {},
});

Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  i18n,
  created() {
    AuthService.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSign', user);
      }
    });
    this.$store.dispatch('loadPetTypes');
    this.$store.dispatch('loadPetBreeds');
    this.$store.dispatch('loadPetColors');
    this.$store.dispatch('loadPetColorings');
  },
});
