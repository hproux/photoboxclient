<template lang="html">
  <Page actionBarHidden="true">
      <Frame>
        <EventsList :list="list"/>
      </Frame>
  </Page>
</template>

<script>
  import EventsList from "./EventsList.vue";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const loader = new LoadingIndicator();
  const options = {
      message: "Récupération des évènements",
      details: 'Veuillez patienter...',
      userInteractionEnabled: false,
  };
  export default {
    components: {
      EventsList
    },
      methods:{
          getList(){
              loader.show(options);
              this.$axios.get("history").then(response => {
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

      created(){
          this.getList();
      },
    data() {
        return {
            list:[],
        };
    },
}
</script>

<style lang="scss" scoped>


</style>
