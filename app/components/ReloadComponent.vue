<template lang="html">
  <Page actionBarHidden="true">

  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";


  export default {
    components: {
        BottomNav
    },
      created(){
          this.$navigateTo(BottomNav);
      },
}
</script>

<style lang="scss" scoped>


</style>
