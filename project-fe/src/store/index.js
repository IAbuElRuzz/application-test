
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';  // Importing the auth module

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth  // Register the auth module
  }
});
    