<template lang="html">
  <Page>
    <AbsoluteLayout>
      <Image class="backArrow" @tap="Back" src="~/img/left-arrow.png" stretch="none"/>
    </AbsoluteLayout>
  </Page>
</template>

<script>

  export default {
methods: {
  Back:function(){
    this.$navigateBack();
  },
}
}
</script>

<style lang="scss" scoped>
.backArrow{

}


</style>

