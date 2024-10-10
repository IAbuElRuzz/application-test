
import axios from 'axios';

const state = {
  user: null
};

const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
};

const actions = {
  async signUp({ dispatch }, formData) {
    await axios.post('http://localhost:3000/auth/signup', formData);
    const UserForm = new FormData();
    UserForm.append('email', formData.email);
    UserForm.append('password', formData.password);
    await dispatch('signIn', UserForm);
  },

  async signIn({ commit }, formData) {
    const response = await axios.post('http://localhost:3000/auth/signin', formData);
    commit('setUser', response.data.user);
  },

  signOut({ commit }) {
    commit('logout');
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.user = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
    