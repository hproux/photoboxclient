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
          <EventsList v-if="this.$store.state.reloadEvents" :list="list" isPublic="true"/>
        </Frame>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import EventsList from "./EventsList.vue";

export default {
  components: {
      EventsList
    },
methods:{
  joinPrivateEvent(){

  },
},
  data() {
    return {
      list: this.$store.state.publicEvents,
    }
  },
    created(){
      this.$store.commit("loadPublicEventsList", this.$axios);
      this.list = this.$store.state.publicEvents;
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
