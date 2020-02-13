<template lang="html">
  <Page actionBarHidden="true">
      <EventsList v-if="renderComponent"/>
  </Page>
</template>

<script>
  import EventsList from "./EventsList.vue";

  export default {
    components: {
      EventsList
    },
      created(){
        this.forceRerender();
        },
      methods:{
        forceRerender:function(){
          this.renderComponent = false;

          this.$nextTick(()=>{
              this.renderComponent = true;
          })
        },
      },
    data: () => {
        return {
            renderComponent: true,
        };
    },
}
</script>

<style lang="scss" scoped>


</style>
