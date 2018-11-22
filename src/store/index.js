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
    typeMarkers: ['find', 'lost', 'saw'],
    adverts: [],
    visibleAdvertPopup: false,
    petTypes: [],
    petBreeds: [],
    petColors: [],
    petColorings: [],
    infoWindow: {
      position: null,
      isOpen: false,
      id: null,
      id_user: null,
      typeMarker: null,
      id_pet_type: null,
      id_pet_breed: null,
      id_pet_color: null,
      id_pet_coloring: null,
      petAge: null,
      contactInfo: null,
      photoUrl: null,
    },
    dataEditAdvert: null,
    filterAdvert: {
      typeMarker: 'all',
      id_pet_type: 'all',
      id_pet_breed: 'all',
      petAge: null,
      id_pet_color: null,
      id_pet_coloring: 'all',
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
      const advertInfo = state.adverts.find(advert => advert.id === payload.id);
      if (payload.id_user) {
        advertInfo.id_user = payload.id_user;
      }
      if (payload.typeMarker) {
        advertInfo.typeMarker = payload.typeMarker;
      }
      if (payload.id_pet_type) {
        advertInfo.id_pet_type = payload.id_pet_type;
      }
      if (payload.id_pet_breed) {
        advertInfo.id_pet_breed = payload.id_pet_breed;
      }
      if (payload.id_pet_color) {
        advertInfo.id_pet_color = payload.id_pet_color;
      }
      if (payload.id_pet_coloring) {
        advertInfo.id_pet_coloring = payload.id_pet_coloring;
      }
      if (payload.petAge) {
        advertInfo.petAge = payload.petAge;
      }
      if (payload.contactInfo) {
        advertInfo.contactInfo = payload.contactInfo;
      }
      if (payload.photoUrl) {
        advertInfo.photoUrl = payload.photoUrl;
      }
      if (payload.status) {
        advertInfo.status = payload.status;
      }
    },
    deleteAdvert(state, id) {
      state.adverts.some((advert, index) => {
        if (advert.id === id) {
          state.adverts.splice(index, 1);
          return advert;
        }
        return false;
      });
    },
    showAdvertPopup(state, payload) {
      state.visibleAdvertPopup = payload;
    },
    updateInfoWindow(state, payload) {
      if (payload.id) {
        state.infoWindow.id = payload.id;
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'isOpen')) {
        state.infoWindow.isOpen = payload.isOpen;
      }
      if (payload.id_user) {
        state.infoWindow.id_user = payload.id_user;
      }
      if (payload.typeMarker) {
        state.infoWindow.typeMarker = payload.typeMarker;
      }
      if (payload.id_pet_type) {
        state.infoWindow.id_pet_type = payload.id_pet_type;
      }
      if (payload.id_pet_breed) {
        state.infoWindow.id_pet_breed = payload.id_pet_breed;
      }
      if (payload.id_pet_color) {
        state.infoWindow.id_pet_color = payload.id_pet_color;
      }
      if (payload.id_pet_coloring) {
        state.infoWindow.id_pet_coloring = payload.id_pet_coloring;
      }
      if (payload.petAge) {
        state.infoWindow.petAge = payload.petAge;
      }
      if (payload.contactInfo) {
        state.infoWindow.contactInfo = payload.contactInfo;
      }
      if (payload.photoUrl) {
        state.infoWindow.photoUrl = payload.photoUrl;
      }
      if (payload.position) {
        state.infoWindow.position = payload.position;
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
          const dataObject = data.val();
          const dataArray = Object.keys(dataObject).map(
            advertId => dataObject[advertId],
          );
          commit('setLoadedAdverts', dataArray);
          commit('setLoading', false);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          commit('setLoading', false);
        });
    },
    createAdvert({ commit, getters, dispatch }, advertData) {
      const advert = {
        id_user: getters.user.id,
        typeMarker: advertData.typeMarker,
        id_pet_type: advertData.petType,
        id_pet_breed: advertData.petBreed,
        id_pet_color: advertData.petColor,
        id_pet_coloring: advertData.petColoring,
        dateCreate: new Date().toISOString(),
        status: 'moderation',
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
          dispatch('updateAdvert', { id: key });
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
      if (payload.id_pet_type) {
        updateObj.id_pet_type = payload.id_pet_type;
      }
      if (payload.id_pet_breed) {
        updateObj.id_pet_breed = payload.id_pet_breed;
      }
      if (payload.id_pet_color) {
        updateObj.id_pet_color = payload.id_pet_color;
      }
      if (payload.id_pet_coloring) {
        updateObj.id_pet_coloring = payload.id_pet_coloring;
      }
      if (payload.petAge) {
        updateObj.petAge = payload.petAge;
      }
      if (payload.contactInfo) {
        updateObj.contactInfo = payload.contactInfo;
      }
      if (payload.photoUrl) {
        updateObj.photoUrl = payload.photoUrl;
      }
      if (payload.status) {
        updateObj.status = payload.status;
      } else {
        updateObj.status = 'moderation';
      }
      firebase
        .database()
        .ref('adverts')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('updateAdvert', updateObj);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    deleteAdvert({ commit }, id) {
      firebase
        .database()
        .ref(`adverts/${id}`)
        .remove()
        .then(() => {
          commit('deleteAdvert', id);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    updateInfoWindow({ commit, getters }, payload) {
      const updateObj = Object.assign({}, payload);
      if (payload.id) {
        if (
          getters.infoWindow.id !== null &&
          getters.infoWindow.id === payload.id
        ) {
          updateObj.isOpen = !getters.infoWindow.isOpen;
        } else {
          updateObj.isOpen = true;
          updateObj.id = payload.id;
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
    userAdverts(state) {
      return state.adverts.filter(
        advert => advert.id_user === (state.user ? state.user.id : null),
      );
    },
    moderationAdverts(state) {
      return state.adverts.filter(advert => advert.status === 'moderation');
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
    typeMarkers(state) {
      return state.typeMarkers;
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
      return value =>
        state.petTypes.find(petType => petType.id === value)[state.locale].name;
    },
    namePetBreeds(state) {
      return value =>
        state.petBreeds.find(petBreed => petBreed.id === value)[state.locale]
          .name;
    },
    namePetColors(state) {
      return arrayColors =>
        arrayColors
          .map(
            color =>
              state.petColors.find(petColor => petColor.id === color)[
                state.locale
              ].name,
          )
          .join(', ');
    },
    namePetColorings(state) {
      return value =>
        state.petColorings.find(petColoring => petColoring.id === value)[
          state.locale
        ].name;
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
