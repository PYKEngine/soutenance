import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./assets/css/custom.css";
import sassStyles from "./assets/sass/style.scss";
import VModal from "vue-js-modal";

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  sassStyles,
  render: h => h(App)
}).$mount("#app");
