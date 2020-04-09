import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import localStorage from 'nativescript-localstorage';
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

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
        token : null,
        memberInfos : null,
        historyEvent:[],
    },
    mutations: {
        setMemberInfos(state, content){
            state.token = content.token;
            state.memberInfos = content;
        },
        loadAllComponents(state){

        },
        loadPublicEventsList(state){

        },
        loadHistoryEventsList(state, axios){
            const options = {
                message: "Récupération de l'historique",
                details: 'Veuillez patienter...',
                userInteractionEnabled: false,
            };
            loader.show(options);
            axios.get("events/history").then(response => {
                state.historyEvent = Object.values(response.data);
                loader.hide();
            }).catch((err) => {
                console.log(err.response.request._response);
                loader.hide();
                alert("Une erreur est survenue");
            });
        }


    }
});
