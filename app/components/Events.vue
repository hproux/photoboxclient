<template lang="html">
  <Page actionBarHidden="true">
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white" tabTextColor="#CCCCCC">
      <TabViewItem title="Privé">
        <Label text="évènements privés" />
      </TabViewItem>
      <TabViewItem title="Public">
        <Frame>
          <EventsList v-if="list" :list="list" isPublic="true"/>
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

  data() {
    return {
      list: [],
    }
  },
    created(){
      this.$store.commit("loadPublicEventsList", this.$axios);
      this.list = this.$store.state.publicEvents;
    }
}
</script>

<style lang="scss" scoped>


</style>
