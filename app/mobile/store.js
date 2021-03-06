import Vue from 'vue';
import Vuex from 'vuex';
import {Native} from '@mobile/bridge/native';
import playerStore from '@base/store/player';
import windowStore from '@base/store/window';
import backgroundStore from '@base/store/background';
import userStore from '@base/store/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    windows: windowStore,
    player: playerStore,
    background: backgroundStore,
    user: userStore,
  },

  state: {
    data: {},
    userAgent: 'Android Axios',

    isPlaying: false,
    sleepTime: 0,
  },

  mutations: {
    pushData(state, {name, data}) {
      state.data[name] = data;
    },

    userAgent(state, userAgent) {
      state.userAgent = userAgent;
    },

    isPlaying(state, isPlaying) {
      state.isPlaying = isPlaying;
    },

    sleepTime(state, sleepTime) {
      state.sleepTime = sleepTime;
    },
  },

  actions: {
    async login(context, user) {
      await context.dispatch('setToken', user.token);
      context.commit('user/auth', user);
    },

    async logout(context) {
      await context.dispatch('setToken', '');
      await context.dispatch('user/logout');
    },

    async setToken(context, token) {
      context.commit('user/token', token);
      await Native.setAuthToken(token);
    },

    async setReactionNative(context, score) {
      await Native.setReaction(score);
    },
  },

  getters: {
    isPlaying: state => state.isPlaying,
    sleepTime: state => state.sleepTime,
    viewVersion: () => process.env.version,
  },
});
