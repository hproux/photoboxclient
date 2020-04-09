<template lang="html">
  <Page actionBarHidden="true">
      <Frame>
        <EventsList v-if="this.$store.state.historyEvent"  :list="this.$store.state.historyEvent"/>
      </Frame>
  </Page>
</template>

<script>
  import EventsList from "./EventsList.vue";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const loader = new LoadingIndicator();

  export default {
    components: {
      EventsList
    },
      created(){
          let options = {
              message: "Récupération de l'historique",
              details: 'Veuillez patienter...',
              userInteractionEnabled: false,
          };
          loader.show(options);
          this.$axios.get("events/history").then(response => {
              this.$store.state.historyEvent = Object.values(response.data);
              loader.hide();
          }).catch((err) => {
              console.log(err.response.request._response);
              loader.hide();
              alert("Une erreur est survenue");
          });
      },
}
</script>

<style lang="scss" scoped>


</style>
