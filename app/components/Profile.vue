<template lang="html">
    <Page actionBarHidden="true">
       <StackLayout v-if="isEdit">
           <Image class="ImgEdit" @tap="edit" horizontalAlignment="right" src="~/img/pen.png"/>
           <Image class="ImgUser" horizontalAlignment="center" src="~/img/user.png"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="LabelNom"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="pseudo"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="tel"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="mail"/>
           <Label horizontalAlignment="center" class="LabelItem LabelLast" v-model="dateNaiss"/>
       </StackLayout>
        <StackLayout v-else>
            <Image class="ImgUserEdit" horizontalAlignment="center" src="~/img/user.png"/>
            <TextField horizontalAlignment="center" hint="Telephone..." class="LabelItem" v-model="tel"/>
            <TextField horizontalAlignment="center" hint="Mail..." class="LabelItem" v-model="mail"/>
            <Button class="BtnSave" text="Sauvegarder" @tap="save"/>
            <Button class="BtnCancel" text="Annuler les modifications" @tap="cancel"/>

        </StackLayout>
    </Page>
</template>

<script>
import Login from "./Login";
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();
const options = {
    message: "Mise à jour du profile",
    details: 'Veuillez patienter...',
    userInteractionEnabled: false,
};
export default {
    methods:{
      edit(){
          this.isEdit = false;
      },
      save(){
          let that = this;
          if(that.tel && that.mail){
              loader.show(options);
              that.$axios.put("user", {
                  tel: that.tel,
                  mail: that.mail,
              }).then((response) => {
                  loader.hide();
                  console.log(response.data);
                  that.$axios.defaults.headers.Authorization = 'Bearer ' + response.data.token;
              }).catch((err) => {
                  console.log(err);
                  loader.hide();
              });
              this.isEdit = true;
          }else{
              alert("Tous les champs ne sont pas correctement remplis.")
          }
      },
        cancel(){
          this.isEdit = true;
        },
    },
    data() {
        return {
            LabelNom : this.$store.state.memberInfos.nom +" "+ this.$store.state.memberInfos.prenom,
            pseudo : this.$store.state.memberInfos.pseudo,
            tel : this.$store.state.memberInfos.tel,
            mail : this.$store.state.memberInfos.mail,
            dateNaiss : this.$store.state.memberInfos.date_naiss,
            isEdit:true,
        };
    }
}
</script>

<style lang="scss" scoped>

    .BtnSave {
        width: 90%;
        border-radius: 100%;
        font-size: 20em;
        margin-top: 2%;
        margin-bottom: 0%;
        color: white;
        background-color: #604591;
    }

    .BtnCancel {
        width: 90%;
        border-radius: 100%;
        font-size: 20em;
        margin-top: 2%;
        margin-bottom: 0%;
        color: #604591;
        background-color: white;
    }

    .ImgEdit{
        margin-right:5%;
        margin-top:5%;
        width:128px;
    }

    .ImgUser {
        border-radius: 100%;
        margin-top:5%;
        margin-bottom: 7%;
        width: 400px;
        background-color: white;
    }

    .ImgUserEdit {
        border-radius: 100%;
        margin-top: 10%;
        margin-bottom: 4%;
        width: 400px;
        background-color: white;
    }

    .LabelItem {
        color: white;
        font-size: 17em;
        margin-bottom : 1%;
        border-bottom-color: white;
        border-bottom-width: 2px;
        width : 70%;
        text-align: center;
        padding-bottom: 15em;
    }

    .LabelLast{
        border-bottom-width: 0px;
        border-bottom-color: transparent;
    }
</style>
