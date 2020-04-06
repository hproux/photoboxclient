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
          <Button v-if="isPublic" class="Btn" text="Rejoindre" @tap="joinPublicEvent"/>
          <Button v-if="!isPublic" class="Btn" text="Voir" @tap="seeEvent"/>
      </StackLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import BackArrow from "./BackArrow.vue";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const loader = new LoadingIndicator();
  const options = {
      message: "Ajout de l'évènement",
      details: 'Veuillez patienter...',
      userInteractionEnabled: false,
  };
  export default {
      props: ['event', 'isPublic'],
    components: {
        BackArrow,
        BottomNav
    },
      methods:{
          closeModal(){
              this.$modal.close();
          },
          joinPublicEvent(){
              let that = this;
              loader.show(options);
              that.$axios.post("event/join/"+this.event.item.token).then((response) => {
                  loader.hide();
                  console.log(response.data);
                  that.closeModal();
                  that.$navigateTo(BottomNav);

              }).catch((err) => {
                  console.log(err.response.request._response);
                  loader.hide();
                  alert("Une erreur est survenue");
              })
          },
          seeEvent(){
            //AJOUTER CODE PHOTO / MESSAGES DE L'EVENT ICI
          },
      },
    data() {
        return {
        };
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
