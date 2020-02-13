import Vue from "nativescript-vue";
import App from "./components/App";
import Vuex from 'vuex';
import store from './store';
new Vue({
store,
    render: h => h('frame', [h(App)])

}).$start();
