import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panToLocation: {
      lat: null,
      lng: null,
    },
    sortByType: { sortBy: 'all' },
  },
  mutations: {
    assigned(state, payload) {
      state.panToLocation.lat = payload.lat;
      state.panToLocation.lng = payload.lng;
    },
    sortByType(state, payload) {
      state.sortByType.sortBy = payload;
    },
  },
  actions: {
    assigned(context, payload) {
      context.commit('assigned', payload);
    },
    sortByType(context, payload) {
      context.commit('sortByType', payload);
    },
  },
  getters: {
    sendPanTo: (state) => state.panToLocation,
    triggerSort: (state) => state.sortByType,
  },
  modules: {
  },
});
