import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import AuthService from '../services/AuthService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    locale: 'ua',
    languages: [
      { value: 'en', text: 'en' },
      { value: 'ua', text: 'ua' },
      { value: 'ru', text: 'ru' },
    ],
    user: null,
    loading: false,
    error: null,
    navigationMenu: [
      {
        path: '/',
        title: 'map',
        icon: 'map',
      },
      {
        path: '/signin',
        title: 'authorization',
        icon: 'person',
      },
    ],
    adverts: [],
    visibleMarkerPopup: false,
    petTypes: [],
    petBreeds: [],
    petColors: [],
    petColorings: [],
    infoWindow: {
      position: null,
      content: null,
      isOpen: false,
      markerId: null,
    },
    dataEditAdvert: null,
    filterAdvert: {
      typeMarker: null,
      petType: null,
      petBreed: null,
      petAge: null,
      petColor: null,
      petColoring: null,
      radius: null,
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setLoadedAdverts(state, payload) {
      state.adverts = payload;
    },
    setLoadedPetTypes(state, payload) {
      state.petTypes = payload;
    },
    setLoadedPetBreeds(state, payload) {
      state.petBreeds = payload;
    },
    setLoadedPetColors(state, payload) {
      state.petColors = payload;
    },
    setLoadedPetColorings(state, payload) {
      state.petColorings = payload;
    },
    createAdvert(state, payload) {
      state.adverts.push(payload);
    },
    updateAdvert(state, payload) {
      const advertInfo = state.adverts.find(advert => advert.id === payload.id)
        .advertInfo;
      if (payload.typeMarker) {
        advertInfo.typeMarker = payload.typeMarker;
      }
      if (payload.petType) {
        advertInfo.petType = payload.petType;
      }
      if (payload.petBreed) {
        advertInfo.petBreed = payload.petBreed;
      }
      if (payload.petAge) {
        advertInfo.petAge = payload.petAge;
      }
      if (payload.petColor) {
        advertInfo.petColor = payload.petColor;
      }
      if (payload.petColoring) {
        advertInfo.petColoring = payload.petColoring;
      }
      if (payload.contactInfo) {
        advertInfo.contactInfo = payload.contactInfo;
      }
      if (payload.photoUrl) {
        advertInfo.photoUrl = payload.photoUrl;
      }
      localStorage.setItem('adverts', JSON.stringify(state.adverts));
    },
    deleteAdvert(state, id) {
      state.adverts.some((advert, index) => {
        if (advert.id === id) {
          state.adverts.splice(index, 1);
          return advert;
        }
        return false;
      });
      localStorage.setItem('adverts', JSON.stringify(state.adverts));
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
        navigationTab2.title = 'profile';
      } else {
        navigationTab2.path = '/signin';
        navigationTab2.title = 'authorization';
      }
    },
    setLocale(state, payload) {
      state.locale = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    loadPetTypes({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('pet_types')
        .once('value')
        .then(data => {
          commit('setLoadedPetTypes', this.getDataOfTable(data));
          commit('setLoading', false);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    loadPetBreeds({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('pet_breeds')
        .once('value')
        .then(data => {
          commit('setLoadedPetBreeds', this.getDataOfTable(data));
          commit('setLoading', false);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    loadPetColors({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('pet_colors')
        .once('value')
        .then(data => {
          commit('setLoadedPetColors', this.getDataOfTable(data));
          commit('setLoading', false);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    loadPetColorings({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('pet_colorings')
        .once('value')
        .then(data => {
          commit('setLoadedPetColorings', this.getDataOfTable(data));
          commit('setLoading', false);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    loadAdverts({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('adverts')
        .once('value')
        .then(data => {
          commit('setLoadedAdverts', data.val());
          commit('setLoading', false);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    createAdvert({ commit, getters }, advertData) {
      const advert = {
        id_user: getters.user.id,
        typeMarker: advertData.typeMarker,
        id_pet_type: advertData.petType,
        id_pet_breed: advertData.petBreed,
        id_pet_color: advertData.petColor,
        id_pet_coloring: advertData.petColoring,
        dateCreate: new Date().toISOString(),
        petAge: advertData.petAge,
        contactInfo: advertData.contactInfo,
        photoUrl: advertData.photoUrl,
        position: {
          lat: advertData.position.lat(),
          lng: advertData.position.lng(),
        },
      };
      firebase
        .database()
        .ref('adverts')
        .push(advert)
        .then(data => data.key)
        .then(key => {
          advert.id = key;
          commit('createAdvert', advert);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    updateAdvert({ commit }, payload) {
      const updateObj = {
        id: payload.id,
      };
      if (payload.typeMarker) {
        updateObj.typeMarker = payload.typeMarker;
      }
      if (payload.petType) {
        updateObj.petType = payload.petType;
      }
      if (payload.petBreed) {
        updateObj.petBreed = payload.petBreed;
      }
      if (payload.petAge) {
        updateObj.petAge = payload.petAge;
      }
      if (payload.petColor) {
        updateObj.petColor = payload.petColor;
      }
      if (payload.petColoring) {
        updateObj.petColoring = payload.petColoring;
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
    autoSign({ dispatch }, payload) {
      dispatch('loadUserData', payload.uid);
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
    loadUserData({ commit }, userId = firebase.auth().currentUser.uid) {
      firebase
        .database()
        .ref(`users/${userId}`)
        .once('value')
        .then(data => {
          commit('setLoading', false);
          commit('setUser', data.val());
          commit('changeNavigationMenu', true);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    signUserIn({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          dispatch('loadUserData');
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          // eslint-disable-next-line
          console.log(error);
        });
    },
    updateLocale({ commit }, payload) {
      commit('setLocale', payload);
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
    locale(state) {
      return state.locale;
    },
    languages(state) {
      return state.languages;
    },
    adverts(state) {
      return state.adverts;
    },
    petTypes(state) {
      return state.petTypes;
    },
    petBreeds(state) {
      return state.petBreeds;
    },
    petColors(state) {
      return state.petColors;
    },
    petColorings(state) {
      return state.petColorings;
    },
    infoWindow(state) {
      return state.infoWindow;
    },
    dataOfTableForSelect(state) {
      return nameTable =>
        state[nameTable].map(dataTable => ({
          value: dataTable.id,
          text: dataTable[state.locale].name,
        }));
    },
    dataPetBreedsForSelect(state) {
      return petType =>
        state.petBreeds
          .filter(dataPetBreed => dataPetBreed.id_pet_type === petType)
          .map(dataPetBreed => ({
            value: dataPetBreed.id,
            text: dataPetBreed[state.locale].name,
          }));
    },
    namePetTypes(state) {
      return value => state.petTypes.find(petType => petType.id === value);
    },
    namePetBreeds(state) {
      return (value, type) =>
        state.petBreeds[type].find(petBreed => petBreed.value === value);
    },
    namePetColors(state) {
      return arrayColors =>
        arrayColors
          .map(
            color =>
              state.petColors.find(petColor => petColor.value === color).text,
          )
          .join(', ');
    },
    namePetColorings(state) {
      return value =>
        state.petColorings.find(petColoring => petColoring.value === value);
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

store.getDataOfTable = data => {
  const dbResult = data.val();
  const dataTable = [];
  Object.keys(dbResult).forEach(dataKey => {
    dataTable.push(dbResult[dataKey]);
  });
  return dataTable;
};

export default store;
