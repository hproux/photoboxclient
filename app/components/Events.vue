<template lang="html">
  <Page actionBarHidden="true">
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white" tabTextColor="#CCCCCC">
      <TabViewItem title="Privé">
        <Label text="évènements privés" />
      </TabViewItem>
      <TabViewItem title="Public">
        <Frame>
        <EventsList :list="list"/>
        </Frame>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import EventsList from "./EventsList.vue";
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();
const options = {
  message: "Récupération des données",
  details: 'Veuillez patienter...',
  userInteractionEnabled: false,
};

export default {
  components: {
      EventsList
    },

  data() {
    return {
      list: [],
    }
  },

    methods:{
       getList(){
        loader.show(options);
        this.$axios.get("events").then(response => {
          Object.values(response.data).forEach((data)=>{
            this.list.push(data);
          });
          //console.log(this.list);
          loader.hide();
        }).catch((err) => {
          console.log(err.response.request._response);
          loader.hide();
          alert("Une erreur est survenue");
        });
       },
    },

    mounted(){
      this.getList();
    }
}
</script>

<style lang="scss" scoped>


</style>
