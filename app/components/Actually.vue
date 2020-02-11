<template lang="html">
    <Page actionBarHidden="true">
        <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white"
                 tabTextColor="#CCCCCC" :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
            <TabViewItem class="TabViewElems" title="Evénements organisés">
                <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
                    <Label class="LabelEvents" :text="LabelEvents"/>
                    <!--Ajouter ici la liste des évènements-->
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

    export default {
    components: {
        CreateEvent,
    },
    methods:{
        createEvent:function(){
            this.$navigateTo(CreateEvent);
        },
    },
    data: () => {
        return {
            LabelEvents:"Vous organisez n événements",
        };
    }
}
</script>

<style lang="scss" scoped>
.BtnCreate{
    display: block;
    width: 25%;
    color: white;
    background-color: transparent;
    border-color: white;
    border-width: 3px;
    border-radius: 40px;
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
</style>
