import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import localStorage from 'nativescript-localstorage';
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);
const NSVuexPersistent = store => {
    // Init hook.
    let storageStr = localStorage.getItem('ns-vuex-persistent');
    if (storageStr) {
        store.replaceState(JSON.parse(storageStr))
    }
    store.subscribe((mutation, state) => {
        // Suscribe hook.
        localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
    })
};

export default new Vuex.Store({
    plugins: [NSVuexPersistent],
    state: {
        urlApi: "http://100.64.84.201",
        token : null,
    },
    mutations: {
        setToken(state, token){
            state.token = token;
        }
    }
});
