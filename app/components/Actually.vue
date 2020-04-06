<template lang="html">
    <Page actionBarHidden="true">
        <TabView class="bg" tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white"
                 tabTextColor="#CCCCCC">
            <TabViewItem class="TabViewElems" title="Evénements organisés">
                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                        <Label class="LabelEvents" v-model="LabelMyEvents"/>
                    <Frame>
                        <EventsList :list="myEventsList" height="80%"/>
                    </Frame>
                    <Button class="BtnCreate" text="+ Créer" @tap="createEvent"/>
                </FlexboxLayout>
            </TabViewItem>
            <TabViewItem class="TabViewElems" title="Mes événements">
                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                <Label class="LabelEvents" v-model="LabelInvolvedEvents"/>
                <Frame>
                    <EventsList :list="involvedEventsList" height="80%"/>
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
    methods:{
        createEvent(){
            this.$navigateTo(CreateEvent);
        }
    },
    data(){
        return {
            LabelInvolvedEvents:null,
            LabelMyEvents:null,
            involvedEventsList:[],
            myEventsList:[],
        };
    },
     created(){
        let that = this;
        loader.show(options);
        //Involved events
         that.$axios.get("events/involved")
             .then((response) => {
                 Object.values(response.data).forEach((data)=>{
                     that.involvedEventsList.push(data);
                 });
                 that.LabelInvolvedEvents = "Vous participez à "+that.involvedEventsList.length+" évènements";
             }).catch((err) => {
             console.log(err.response.request._response);
             alert("Une erreur est survenue");
         })
         //My Events
         that.$axios.get("events/created")
             .then((response) => {
                 loader.hide();
                 Object.values(response.data).forEach((data)=>{
                     that.myEventsList.push(data);
                 });
                 that.LabelMyEvents = "Vous organisez "+that.myEventsList.length+" évènements";
             }).catch((err) => {
             console.log(err.response.request._response);
             loader.hide();
             alert("Une erreur est survenue");
         })
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
