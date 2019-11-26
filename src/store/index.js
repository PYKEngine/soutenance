import Vue from "vue";
import Vuex from "vuex";
import * as auth from "../services/AuthService";
import * as admin from "../services/AdminServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: `/api`,
    name: null,
    userId: null,
    is_admin: false
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if (state.isLoggedIn) {
        state.name = auth.getUsername();
        state.userId = auth.getUserId();
        state.is_admin = admin.getAdminSign();
      } else {
        state.userId = null;
        state.name = null;
        state.is_admin = null;
      }
    }
  },
  actions: {
    authenticate(ctx) {
      ctx.commit("authenticate");
    }
  }
});
