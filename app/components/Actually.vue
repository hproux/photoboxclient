<template lang="html">
    <Page actionBarHidden="true">
        <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white"
                 tabTextColor="#CCCCCC">
            <TabViewItem class="TabViewElems" title="Evénements organisés">

                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                        <Label class="LabelEvents" :text="LabelEvents"/>
                    <Frame>
                        <EventsList class="liste"/>
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


    export default {
        created(){

        },
    components: {
        CreateEvent,
        EventsList,
    },
    methods:{
        createEvent:function(){
            this.$navigateTo(CreateEvent);
        }
    },
    data: () => {
        return {
            LabelEvents:"Vous organisez n événements",
        };
    }
}
</script>

<style lang="scss">
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
        height:70%;
    }

</style>
