<template lang="html">
  <Page actionBarHidden="true">
      <ActionBar>
          <Label text="History"></Label>
      </ActionBar>

      <GridLayout class="page__content">
          <Label class="page__content-icon far" text.decode="&#xf1ea;"></Label>
          <Label class="page__content-placeholder" :text="message"></Label>
      </GridLayout>
  </Page>
</template>

<script>
export default {
    data: () => {
        return {
            message: "<!-- History page content goes here -->"
        };
    },
}
</script>

<style lang="scss" scoped>


</style>
