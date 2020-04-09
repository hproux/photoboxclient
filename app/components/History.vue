<template lang="html">
  <Page actionBarHidden="true">
      <Frame>
        <EventsList v-if="list"  :list="list"/>
      </Frame>
  </Page>
</template>

<script>
  import EventsList from "./EventsList.vue";

  export default {
    components: {
      EventsList
    },
      created(){
          this.$store.commit('loadHistoryEventsList', this.$axios);
          this.list = this.$store.state.historyEvent;
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
