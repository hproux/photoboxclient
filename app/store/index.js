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
        publicEvents:[],
        involvedEvents:[],
        myEvents:[],
        reloadActually:false,
        reloadHistory:false,
        reloadEvents:false,
    },
    mutations: {
        setMemberInfos(state, content){
            state.token = content.token;
            state.memberInfos = content;
        },
        loadPublicEventsList(state, axios){
            let options = {
                message: "Récupération des évènements publics",
                details: 'Veuillez patienter...',
                userInteractionEnabled: false,
            };
            loader.show(options);
            axios.get("events").then(response => {
                state.publicEvents = Object.values(response.data);
                state.reloadEvents = false;
                state.reloadEvents = true;
                loader.hide();
            }).catch((err) => {
                console.log(err.response.request._response);
                loader.hide();
                alert("Une erreur est survenue");
            });
        },
        loadHistoryEventsList(state, axios){
           let options = {
                message: "Récupération de l'historique",
                details: 'Veuillez patienter...',
                userInteractionEnabled: false,
            };
            loader.show(options);
            axios.get("events/history").then(response => {
                state.historyEvent = Object.values(response.data);
                state.reloadHistory = false;
                state.reloadHistory = true;
                loader.hide();
            }).catch((err) => {
                console.log(err.response.request._response);
                loader.hide();
                alert("Une erreur est survenue");
            });
        },
        loadInvolvedEvents(state, axios){
            let options = {
                message: "Chargement des évènements",
                details: 'Veuillez patienter...',
                userInteractionEnabled: false,
            };
            //Involved events
            loader.show(options);
            axios.get("events/involved")
                .then((response) => {
                    state.involvedEvents = Object.values(response.data);
                    state.reloadActually = false;
                    state.reloadActually = true;

                }).catch((err) => {
                console.log(err.response.request._response);
                alert("Une erreur est survenue");
            })
        },
        loadMyEvents(state, axios){
            let options = {
                message: "Chargement de vos évènements",
                details: 'Veuillez patienter...',
                userInteractionEnabled: false,
            };
            //created events
            loader.show(options);
            axios.get("events/created")
                .then((response) => {
                    loader.hide();
                    state.myEvents = Object.values(response.data);
                    state.reloadActually = false;
                    state.reloadActually = true;
                }).catch((err) => {
                console.log(err.response.request._response);
                loader.hide();
                alert("Une erreur est survenue");
            })
        }


    }
});
