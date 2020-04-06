<template lang="html">
    <Page actionBarHidden="true">
        <TabView class="bg" tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white"
                 tabTextColor="#CCCCCC">
            <TabViewItem class="TabViewElems" title="Evénements organisés">
                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                        <Label class="LabelEvents" :text="LabelEvents"/>
                    <Frame>
                        <EventsList height="80%"/>
                    </Frame>
                    <Button class="BtnCreate" text="+ Créer" @tap="createEvent"/>
                </FlexboxLayout>
            </TabViewItem>
            <TabViewItem class="TabViewElems" title="Mes événements">
                <Label text="Mes événements"/>
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
            LabelEvents:"Vous organisez n événements",
            involvedEventsList:null,
            myEventsList:null,
        };
    },
     created(){
        let that = this;
        loader.show(options);
        //Involved events
         that.$axios.get("events/involved")
             .then((response) => {
                 that.involvedEventsList = response.data;
                 //console.log(that.involvedEventsList);
             }).catch((err) => {
             console.log(err.response.request._response);
             alert("Une erreur est survenue");
         })
         //My Events
         that.$axios.get("events/created")
             .then((response) => {
                 loader.hide();
                 //console.log(response.data);
                 that.myEventsList = response.data;
                 Object.values(response.data).forEach((data)=>{
                    console.log(data.name);
                 });
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
