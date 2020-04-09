import Vue from "nativescript-vue";
import store from './store';
import Vuex from 'vuex';
import axios from 'axios';
import App from "./components/App";
const connectivity = require("connectivity");
export const base = axios.create({
    baseURL: 'https://apiphotobox.tallium.tech/',
    headers: {
        'Authorization' : ''
    }
});

base.interceptors.request.use( (config) =>{
    const connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            config.cancelToken = new axios.CancelToken((cancel) => cancel('Aucune Connexion Internet'));
            alert("Aucune connexion Internet");
            return config;
            break;
        case connectivity.connectionType.wifi:
            return config;
            break;
        case connectivity.connectionType.mobile:

            return config;
            break;
    }
})

Vue.prototype.$axios = base;
Vue.use(Vuex);

Vue.config.silent = TNS_ENV === 'production'

new Vue({
    store,
    axios,
    template: `
        <Frame>
            <App />
        </Frame>`,

    components: {
        App
    }
}).$start();
