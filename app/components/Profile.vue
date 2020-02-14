<template lang="html">
    <Page actionBarHidden="true">
       <StackLayout v-if="isEdit">
           <Image class="ImgEdit" @tap="edit" horizontalAlignment="right" src="~/img/pen.png"/>
           <Image class="ImgUser" horizontalAlignment="center" src="~/img/user.png"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="LabelNom"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="tel"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="mail"/>
           <Label horizontalAlignment="center" class="LabelItem LabelLast" v-model="dateNaiss"/>
       </StackLayout>
        <StackLayout v-else>
            <Image class="ImgUserEdit" horizontalAlignment="center" src="~/img/user.png"/>
            <TextField horizontalAlignment="center" class="LabelItem" v-model="LabelNom"/>
            <TextField horizontalAlignment="center" class="LabelItem" v-model="tel"/>
            <TextField horizontalAlignment="center" class="LabelItem" v-model="mail"/>
            <Button class="BtnSave" text="Sauvegarder" @tap="save"/>

        </StackLayout>

    </Page>
</template>

<script>
export default {
    methods:{
      edit:function(){
          this.isEdit = false;
      },
      save:function(){
          if(this.LabelNom && this.tel && this.mail){

              this.isEdit = true;
          }else{
              alert("Tous les champs ne sont pas correctement remplis.")
          }
      },
    },
    data: function() {
        return {
            LabelNom : this.$store.state.memberInfos.nom +" "+ this.$store.state.memberInfos.prenom,
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
        margin-top: 0%;
        margin-bottom: 0%;
        color: white;
        background-color: #604591;
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
        margin-bottom: 7%;
        width: 400px;
        background-color: white;
    }

    .LabelItem {
        color: white;
        font-size: 17em;
        margin-bottom : 3%;
        border-bottom-color: white;
        border-bottom-width: 3px;
        width : 70%;
        text-align: center;
        padding-bottom: 15em;
    }

    .LabelLast{
        border-bottom-width: 0px;
        border-bottom-color: transparent;
    }
</style>
