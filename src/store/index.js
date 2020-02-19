import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panToLocation: {
      lat: null,
      lng: null,
    },
  },
  mutations: {
    assigned(state, payload) {
      state.panToLocation.lat = payload.lat;
      state.panToLocation.lng = payload.lng;
    },
  },
  actions: {
    assigned(context, payload) {
      context.commit('assigned', payload);
    },
  },
  getters: {
    sendPanTo: (state) => state.panToLocation,
  },
  modules: {
  },
});
