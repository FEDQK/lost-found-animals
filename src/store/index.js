import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import AuthService from '../services/AuthService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    navigationMenu: [
      {
        path: '/',
        title: 'Map',
        icon: 'map',
      },
      {
        path: '/signin',
        title: 'Authorization',
        icon: 'person',
      },
    ],
    advertsData: localStorage.getItem('advertsData')
      ? JSON.parse(localStorage.getItem('advertsData'))
      : [],
    visibleMarkerPopup: false,
    animalTypes: [
      { text: 'Собака', value: 'dog' },
      { text: 'Кіт', value: 'cat' },
      { text: 'Папуга', value: 'parrot' },
    ],
    animalBreeds: {
      dog: [
        { text: 'Німецька вівчарка', value: 'german-shepherd' },
        { text: 'Лабрадор-ретривер', value: 'labrador-retriever' },
        { text: 'Англійський бульдог', value: 'english-bulldog' },
        { text: 'Пудель', value: 'poodle' },
        { text: 'Бігль', value: 'beagle' },
        { text: 'Чихуахуа', value: 'chihuahua' },
        { text: 'Мопс', value: 'pug' },
        { text: 'Ротвейлер', value: 'rottweiler' },
      ],
      cat: [
        { text: 'Персидська', value: 'persian' },
        { text: 'Сіамська', value: 'siamese' },
        { text: 'Мейн Кун', value: 'maine-coon' },
        { text: 'Абіссінська', value: 'abyssinian' },
        { text: 'Регдолли', value: 'regdolls' },
        { text: 'Екзот', value: 'exodus' },
        { text: 'Сфінкс', value: 'sphinx' },
      ],
      parrot: [
        { text: 'Хвилястий', value: 'wavy' },
        { text: 'Нерозлучник', value: 'not-solvent' },
        { text: 'Кореллі', value: 'corelli' },
        { text: 'Ожереловий', value: 'necklace' },
        { text: 'Амазон', value: 'amazon' },
        { text: 'Какаду', value: 'cockatoo' },
      ],
    },
    animalColors: [
      { text: 'Чорний', value: 'black' },
      { text: 'Сірий', value: 'gray' },
      { text: 'Рудий', value: 'red' },
      { text: 'Білий', value: 'white' },
      { text: 'Коричневий', value: 'brown' },
      { text: 'Червоний', value: 'red' },
      { text: 'Блакитний', value: 'blue' },
      { text: 'Жовтий', value: 'yellow' },
      { text: 'Зелений', value: 'green' },
    ],
    animalColorings: [
      { text: 'Суцільний', value: 'solid' },
      { text: 'Смугастий таббі', value: 'striped-tabby' },
      { text: 'Мармуровий таббі', value: 'tabby-marble' },
      { text: 'Плямистий таббі', value: 'spotted-tabby' },
    ],
    infoWindow: {
      position: null,
      content: null,
      isOpen: false,
      markerId: null,
    },
    dataEditAdvert: null,
    filterAdvert: {
      typeMarker: null,
      animalType: null,
      animalBreed: null,
      animalAge: null,
      animalColor: null,
      animalColoring: null,
      radius: null,
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    createAdvert(state, payload) {
      state.advertsData.push(payload);
      localStorage.setItem('advertsData', JSON.stringify(state.advertsData));
    },
    updateAdvert(state, payload) {
      const advertInfo = state.advertsData.find(
        advert => advert.id === payload.id,
      ).advertInfo;
      if (payload.typeMarker) {
        advertInfo.typeMarker = payload.typeMarker;
      }
      if (payload.animalType) {
        advertInfo.animalType = payload.animalType;
      }
      if (payload.animalBreed) {
        advertInfo.animalBreed = payload.animalBreed;
      }
      if (payload.animalAge) {
        advertInfo.animalAge = payload.animalAge;
      }
      if (payload.animalColor) {
        advertInfo.animalColor = payload.animalColor;
      }
      if (payload.animalColoring) {
        advertInfo.animalColoring = payload.animalColoring;
      }
      if (payload.contactInfo) {
        advertInfo.contactInfo = payload.contactInfo;
      }
      if (payload.photoUrl) {
        advertInfo.photoUrl = payload.photoUrl;
      }
      localStorage.setItem('advertsData', JSON.stringify(state.advertsData));
    },
    deleteAdvert(state, id) {
      state.advertsData.some((advert, index) => {
        if (advert.id === id) {
          state.advertsData.splice(index, 1);
          return advert;
        }
        return false;
      });
      localStorage.setItem('advertsData', JSON.stringify(state.advertsData));
    },
    showMarkerPopup(state, payload) {
      state.visibleMarkerPopup = payload;
    },
    updateInfoWindow(state, payload) {
      if (payload.position) {
        state.infoWindow.position = payload.position;
      }
      if (payload.content) {
        state.infoWindow.content = payload.content;
      }
      if (payload.markerId) {
        state.infoWindow.markerId = payload.markerId;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'isOpen')) {
        state.infoWindow.isOpen = payload.isOpen;
      }
    },
    editAdvert(state, payload) {
      state.dataEditAdvert = payload;
    },
    updateAdvertFilter(state, payload) {
      state.filterAdvert[payload.typeFilter] = payload.value;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    changeNavigationMenu(state, payload) {
      const navigationTab2 = state.navigationMenu[1];
      if (payload) {
        navigationTab2.path = '/profile';
        navigationTab2.title = 'Profile';
      } else {
        navigationTab2.path = '/signin';
        navigationTab2.title = 'Authorization';
      }
    },
    clearError(state) {
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    createAdvert({ commit }, markerData) {
      const advert = {
        id: String(Date.now()),
        position: {
          lat: markerData.position.lat(),
          lng: markerData.position.lng(),
        },
        advertInfo: markerData.advertInfo,
      };
      commit('createAdvert', advert);
    },
    updateAdvert({ commit }, payload) {
      const updateObj = {
        id: payload.id,
      };
      if (payload.typeMarker) {
        updateObj.typeMarker = payload.typeMarker;
      }
      if (payload.animalType) {
        updateObj.animalType = payload.animalType;
      }
      if (payload.animalBreed) {
        updateObj.animalBreed = payload.animalBreed;
      }
      if (payload.animalAge) {
        updateObj.animalAge = payload.animalAge;
      }
      if (payload.animalColor) {
        updateObj.animalColor = payload.animalColor;
      }
      if (payload.animalColoring) {
        updateObj.animalColoring = payload.animalColoring;
      }
      if (payload.contactInfo) {
        updateObj.contactInfo = payload.contactInfo;
      }
      if (payload.photoUrl) {
        updateObj.photoUrl = payload.photoUrl;
      }
      commit('updateAdvert', updateObj);
    },
    deleteAdvert({ commit }, markerId) {
      commit('deleteAdvert', markerId);
    },
    updateInfoWindow({ commit, getters }, payload) {
      const updateObj = {};
      if (payload.position) {
        updateObj.position = payload.position;
      }
      if (payload.advertInfo) {
        updateObj.content = payload.advertInfo;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'isOpen')) {
        updateObj.isOpen = payload.isOpen;
      }
      if (payload.id) {
        if (
          getters.infoWindow.markerId !== null &&
          getters.infoWindow.markerId === payload.id
        ) {
          updateObj.isOpen = !getters.infoWindow.isOpen;
        } else {
          updateObj.isOpen = true;
          updateObj.markerId = payload.id;
        }
      }
      commit('updateInfoWindow', updateObj);
    },
    editAdvert({ commit }, payload) {
      commit('editAdvert', payload);
    },
    updateAdvertFilter({ commit }, payload) {
      commit('updateAdvertFilter', payload);
    },
    autoSign({ commit }, payload) {
      commit('setUser', { id: payload.uid });
      commit('changeNavigationMenu', true);
    },
    createUser({ commit }) {
      const userId = firebase.auth().currentUser.uid;
      const newUser = {
        id: userId,
        role: 'user',
      };
      firebase
        .database()
        .ref(`users/${userId}`)
        .set(newUser)
        .then(() => {
          commit('setLoading', false);
          commit('setUser', newUser);
          commit('changeNavigationMenu', true);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          // eslint-disable-next-line
          console.log(error);
        });
    },
    signUserUp({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          dispatch('createUser');
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          // eslint-disable-next-line
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
          };
          commit('setUser', newUser);
          commit('changeNavigationMenu', true);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          // eslint-disable-next-line
          console.log(error);
        });
    },
    logout({ commit }) {
      AuthService.signOut();
      commit('setUser', null);
      commit('changeNavigationMenu', false);
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    advertsData(state) {
      return state.advertsData;
    },
    animalTypes(state) {
      return state.animalTypes;
    },
    animalBreeds(state) {
      return state.animalBreeds;
    },
    animalColors(state) {
      return state.animalColors;
    },
    animalColorings(state) {
      return state.animalColorings;
    },
    infoWindow(state) {
      return state.infoWindow;
    },
    nameAnimalTypes(state) {
      return value =>
        state.animalTypes.find(animalType => animalType.value === value);
    },
    nameAnimalBreeds(state) {
      return (value, type) =>
        state.animalBreeds[type].find(
          animalBreed => animalBreed.value === value,
        );
    },
    nameAnimalColors(state) {
      return arrayColors =>
        arrayColors
          .map(
            color =>
              state.animalColors.find(
                animalColor => animalColor.value === color,
              ).text,
          )
          .join(', ');
    },
    nameAnimalColorings(state) {
      return value =>
        state.animalColorings.find(
          animalColoring => animalColoring.value === value,
        );
    },
    dataEditAdvert(state) {
      return state.dataEditAdvert;
    },
    filterAdvert(state) {
      return state.filterAdvert;
    },
    user(state) {
      return state.user;
    },
    navigationMenu(state) {
      return state.navigationMenu;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
  modules: {},
});

export default store;
