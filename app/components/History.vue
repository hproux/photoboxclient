<template lang="html">
  <Page actionBarHidden="true">
      <Frame>
      <EventsList/>
      </Frame>
  </Page>
</template>

<script>
  import EventsList from "./EventsList.vue";

  export default {
    components: {
      EventsList
    },
      methods:{
      },
    data() {
        return {
        };
    },
}
</script>

<style lang="scss" scoped>


</style>
