<template lang="html">
  <Page actionBarHidden="true">
    <StackLayout>
      <ListView class="list" for="item in list" @itemTap="showEventDetail">
        <v-template>
          <FlexboxLayout class="item" alignItems="center" alignContent="center" flexDirection="row">
            <Image class="ImgEvent" src="~/img/user.png"/>
            <StackLayout>
                <FlexboxLayout justifyContent="space-between" flexDirection="row">
                  <Label class="LabelItem" :text="item.name"/>
                  <Label class="LabelItem LabelEtat" text="inscrit"/>
                </FlexboxLayout>
              <FlexboxLayout class="fullWidth" justifyContent="space-between" flexDirection="row">
                <FlexboxLayout flexDirection="row">
                  <Image class="ImgPin" src="~/img/pin.png"/>
                  <Label class="LabelItem" :text="item.location"/>
                </FlexboxLayout>
                <Label class="LabelItem" :text="transformDate(item.date)"/>
              </FlexboxLayout>
            </StackLayout>
    </FlexboxLayout>
        </v-template>
      </ListView>
      </StackLayout>
  </Page>
</template>
<script>
  import EventDetail from "./EventDetail";
  import formatDate from "../utils/formatDate";
  export default {
    props: ['list', 'isPublic'],
    data() {
      return {
      }
    },

  methods: {
    showEventDetail(event){
      this.$showModal(EventDetail, { fullscreen: true, props: { event: event, isPublic: this.isPublic }});
    },
    transformDate(date){
      let convertedDate = new Date(date)
      return formatDate.dateToYearMonthDay(convertedDate);
    }
  },
}
</script>

<style lang="scss" scoped>


.ImgEvent{
  border-radius: 100%;
  width: 400px;
}
.fullWidth{
  width:100%;
    }

.ImgPin{
  width:64px;
}
.LabelItem{
  color:white;
  font-size:17em;
}

  .item{
    background-color: transparent;
    padding-top: -80px;
    padding-bottom: -50px;
    border-color: white;
    border-style: solid;
    border-width: 1px;
  }

   .list{
    height: 100%;
  }
</style>

