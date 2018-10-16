// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App';
import AuthService from './services/AuthService';
import store from './store';
import router from './router';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    main: '#292d33', // #E53935
    active: '#24abeb', // #FFCDD2
  },
});
Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'geometry, places',
    key: 'AIzaSyDzVu6xPSu-1otbwW54WrDBFyLqWT1u5uY',
  },
});

const EventBus = new Vue();

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
  created() {
    AuthService.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSign', user);
      }
    });
    // this.$store.dispatch('loadAdverts');
  },
});
