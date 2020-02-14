import Vue from "nativescript-vue";
import store from './store';
import Vuex from 'vuex';
import App from "./components/App";
Vue.use(Vuex);

Vue.config.silent = TNS_ENV === 'production'
/*
new Vue({
    render: h => h(App),

    store: store,
}).$start();*/


new Vue({
    store,
    template: `
        <Frame>
            <App />
        </Frame>`,

    components: {
        App
    }
}).$start();
