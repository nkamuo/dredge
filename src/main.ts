import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import apolloProvider from './plugins/vue-apollo';
import './plugins/vee-validate';
import './plugins/infinite-loading';
import Application from './lib/applicattion';
import config from './app.config'


Vue.config.productionTip = false

var view = new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');




const app = new Application(Vue, store, router);

app.boot(config);
