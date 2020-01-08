<template lang="html">
  <Page actionBarHidden="true">
    <BottomNavigation>
        <TabStrip>
          <TabStripItem class="navigation__item">
              <Label text="Historique"></Label>
              <Image src.decode="font://&#xf1da;" class="fas t-36"></Image>
          </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Evenements"></Label>
                <Image src.decode="font://&#xf689;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="En cours"></Label>
                <Image src.decode="font://&#xf7e4;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Profile"></Label>
                <Image src.decode="font://&#xf406;" class="fas t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame>
                <History />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Events />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Actually />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Profile />
            </Frame>
        </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import History from "./History.vue";
import Events from "./Events.vue";
import Actually from "./Actually.vue";
import Profile from "./Profile.vue";

export default {
  components: {
    History,
    Events,
    Actually,
    Profile
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>
