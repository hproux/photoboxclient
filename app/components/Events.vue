<template lang="html">
  <Page actionBarHidden="true">
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white" tabTextColor="#CCCCCC">
      <TabViewItem title="Privé">
        <FlexboxLayout alignItems="center" justifyContent="center">
          <StackLayout width="85%" class="private">
            <Label class="lbl" text="Rejoignez un évènements privés !" />
            <TextField ckass="input" hint="ex : D7CT5"/>
            <Button class="Btn" text="Rejoindre" @tap="joinPrivateEvent"/>
            </StackLayout>
          </FlexboxLayout>
      </TabViewItem>
      <TabViewItem title="Public">
        <Frame>
          <EventsList v-if="publicEvents" :list="publicEvents" isPublic="true"/>
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

export default {
  components: {
      EventsList
    },
  data(){
    return{
      publicEvents:[],
    }
  },
  methods:{
    joinPrivateEvent(){

    },
  },
  created(){
    let options = {
      message: "Récupération des évènements publics",
      details: 'Veuillez patienter...',
      userInteractionEnabled: false,
    };
    loader.show(options);
    this.$axios.get("events").then(response => {
      this.publicEvents = Object.values(response.data);
      loader.hide();
    }).catch((err) => {
      console.log(err.response.request._response);
      loader.hide();
      alert("Une erreur est survenue");
    });
  }
}
</script>

<style lang="scss" scoped>
  .Btn{
        border-radius: 100%;
        font-size: 20em;
        color : white;
        background-color: #604591;
        margin-top: 150px;
    }

    .private *{
      color: white;
      placeholder-color: white;
            font-size: 18px;

    }

    .lbl{
      margin-left: 3%;
      margin-bottom: 20px;
    }
</style>
