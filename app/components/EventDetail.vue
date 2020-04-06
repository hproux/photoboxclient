<template lang="html">
  <Page actionBarHidden="true">
      <StackLayout>
          <Image class="backArrow" @tap="closeModal" src="~/img/left-arrow.png" stretch="none"/>
          <Image class="ImgEvent" src="~/img/user.png"/>
          <Label horizontalAlignment="center" class="Label LabelNom" v-model="$props.event.item.name"/>
          <FlexboxLayout flexDirection="row">
              <Image class="ImgPin" src="~/img/pin.png"/>
              <Label horizontalAlignment="center" class="Label LabelDescription" v-model="$props.event.item.location"/>
          </FlexboxLayout>
          <Label horizontalAlignment="center" class="Label LabelDescription" v-model="$props.event.item.date"/>
          <Label horizontalAlignment="center" class="Label LabelDescription" v-model="$props.event.item.description"/>
          <Button class="Btn" text="Rejoindre" @tap=""/>

      </StackLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import BackArrow from "./BackArrow.vue";
  export default {
      props: ['event'],
    components: {
        BackArrow,
        BottomNav
    },
      methods:{
          closeModal(){
              this.$modal.close();
          },
      },
    data() {
        return {
        };
    },
      created(){
          console.log(this.event);
      },
}
</script>

<style lang="scss" scoped>
    .Btn{
        width : 90%;
        border-radius: 100%;
        font-size: 20em;
        margin-top: 25%;
        margin-bottom: 2%;
        color : white;
        background-color: #604591;
    }

    .ImgPin{
        width:64px;
    }
    .ImgEvent{
        border-radius: 100%;
        width: 400px;
        margin-bottom: 2%;
    }
    .Label{
        color:white;
        font-size:17em;
        overflow: auto;
        text-overflow: ellipsis;
    }

    .LabelNom{
       font-size: 25px;
        margin-bottom: 5%;
    }
    .backArrow{
        margin-top: 3%;
    }

</style>
