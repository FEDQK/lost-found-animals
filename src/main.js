// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App';
import store from './store';

Vue.use(Vuetify);
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
  store,
  components: { App },
  template: '<App/>',
});
