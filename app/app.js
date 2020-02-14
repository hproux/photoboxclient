import Vue from "nativescript-vue";
import Vuex from 'vuex';
Vue.use(Vuex);
import App from "./components/App";
import Navigator from 'nativescript-vue-navigator'
import {routes} from './routes'
Vue.use(Navigator, {routes})

import store from './store';

Vue.config.silent = TNS_ENV === 'production'

new Vue({
store,
    render: h => h(App),
}).$start();
