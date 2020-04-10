<template lang="html">
    <Page actionBarHidden="true">
        <TabView class="bg" tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white"
                 tabTextColor="#CCCCCC">
            <TabViewItem class="TabViewElems" title="Evénements organisés">
                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                        <Label class="LabelEvents" v-model="LabelMyEvents"/>
                    <Frame>
                        <EventsList v-if="myEventsList && renderComponent" :list="myEventsList" isOwner="true" height="80%"/>
                    </Frame>
                    <Button class="BtnCreate" text="+ Créer" @tap="createEvent"/>
                </FlexboxLayout>
            </TabViewItem>
            <TabViewItem class="TabViewElems" title="Mes événements">
                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                <Label class="LabelEvents" v-model="LabelInvolvedEvents"/>
                <Frame>
                    <EventsList v-if="involvedEventsList" :list="involvedEventsList" height="80%"/>
                </Frame>
                </FlexboxLayout>

            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import CreateEvent from "./CreateEvent.vue";
    import EventsList from "./EventsList.vue";
    const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
    const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
    const loader = new LoadingIndicator();
    const options = {
            message: "Chargement des évènements",
            details: 'Veuillez patienter...',
            userInteractionEnabled: false,
        };

    export default {
    components: {
        CreateEvent,
        EventsList,
    },

    computed: {
        check() {
            return this.$store.state.refresh
        }
    },

    watch: {
        check: function () {
            this.renderComponent = false;
            this.loadCreatedEvents()
        }
    },

    methods:{
        createEvent(){
            this.$showModal(CreateEvent, { fullscreen: true});
        },

        loadInvolvedEvents(){
        //Involved events
        loader.show(options);
        this.$axios.get("events/involved")
            .then((response) => {
                loader.hide();
                this.involvedEventsList = Object.values(response.data);
                this.LabelInvolvedEvents = "Vous participez à "+this.involvedEventsList.length+" évènements";
            }).catch((err) => {
            console.log(err.response.request._response);
            loader.hide();
            alert("Une erreur est survenue");
         })
        },

        loadCreatedEvents(){
            //created events
            this.$axios.get("events/created")
                .then((response) => {
                    loader.hide();
                    this.myEventsList = Object.values(response.data);
                    this.LabelMyEvents = "Vous organisez "+this.myEventsList.length+" évènements";
                    //force render composant
                    if(this.renderComponent == false){
                        this.$nextTick(() => {
                            this.renderComponent = true;
                        });
                    }
                }).catch((err) => {
                console.log(err.response.request._response);
                loader.hide();
                alert("Une erreur est survenue");
            })
        },

    },
    data(){
        return {
            LabelInvolvedEvents:null,
            LabelMyEvents:null,
            involvedEventsList: [],
            myEventsList: [],
            renderComponent: true,
        };
    },
     created(){
        this.loadInvolvedEvents();
        this.loadCreatedEvents();
        

         
      },
 }
</script>

<style lang="scss">
    .bg{
        background: linear-gradient(200deg, #BD5DCD, #824AA7, #604591, #3F2D86, #362472);
    }
.BtnCreate{
    width: 25%;
    color: white;
    background-color: #824AA7;
    border-color: white;
    border-width: 3px;
    border-radius: 40px;
    font-size:15em;
    height: 30em;
}

.LabelEvents{
    color : white;
    font-size:15em;
    margin-top : 5%;
    margin-left:3%;
}

.TabViewElems{
    font-size:12em;
}

    .liste{
        //height:70%;
    }

</style>
