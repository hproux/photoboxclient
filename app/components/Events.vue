<template lang="html">
  <Page actionBarHidden="true">
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="white" selectedTabTextColor="white" tabTextColor="#CCCCCC" :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
      <TabViewItem title="Privé">
        <Label text="évènements privés" />
      </TabViewItem>
      <TabViewItem title="Public">
        <Label text="évènements publics" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
export default {
  methods: {
    indexChange: function(args) {
        let newIndex = args.value
        console.log('Current tab index: ' + newIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/purple";
// End custom common variables

// Custom styles

</style>
