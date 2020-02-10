<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="transparent" selectedTabTextColor="transparent"
             tabTextColor="transparent" :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
      <TabViewItem>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <Label class="LabelInscritption" text="Inscritption"/>
          <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png"/>
          <TextField class="TextField TextFieldName" :text="nom" hint="Nom"/>
          <TextField class="TextField" :text="prenom" hint="Prénom"/>
          <Label class="TextField TextFieldBirth" text="Date de naissance"/>
          <DatePicker :maxDate="maxDate" :date="date"/>
          <Button class="Btn BtnSuivant" text="Suivant" @tap="next"/>
        </FlexboxLayout>
      </TabViewItem>
      <TabViewItem>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <Label class="LabelInscritption" text="Inscritption"/>
          <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png"/>
          <TextField class="TextField TextFieldMobile" :text="mobile" hint="Téléphone"/>
          <TextField class="TextField2" :text="mail" hint="mail"/>
          <TextField class="TextField2" :text="password" hint="Mot de passe"/>
          <TextField class="TextField2" :text="passwordVerif" hint="Confirmer le mot de passe"/>

          <Button class="Btn BtnRetour" text="Retour" @tap="back"/>
          <Button class="Btn BtnRegister" text="Terminer" @tap="register"/>

        </FlexboxLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
  import Login from "./Login.vue";

  export default {
    components:{
      Login,
    },
methods: {
  next:function(){
    this.selectedIndex=1;
  },
  register:function(){
    this.$navigateTo(Login);
  },
  back: function () {
    this.selectedIndex = 0;
  },
  indexChange: function (args) {
    this.selectedIndex = args.value
    console.log('Current tab index: ' + this.selectedIndex)
  }
},
  data() {
    return {
      nom: null,
      prenom: null,
      mail : null,
      password : null,
      passwordVerif : null,
      mobile : null,
      selectedIndex : 0,
      date: Date(),
      maxDate: new Date(),
    }
  },
}
</script>

<style lang="scss" scoped>

  .Btn {
    width: 90%;
    border-radius: 100%;
    font-size: 20em;
  }

  .BtnRetour {
    margin-top:8%;
    color: white;
    background-color: #604591;
  }

  .TextFieldBirth {
    margin-top: 3%;
    text-align: center;
  }

  .TextFieldMobile{
    margin-top:10%;
  }

  .TextField {
    color: white;
    width: 80%;
    placeholder-color: white;
    font-size: 15em;
  }

  .TextField2 {
    color: white;
    width: 80%;
    placeholder-color: white;
    font-size: 15em;
    margin-top:2%;
  }

  .TextFieldName {
    margin-top: 1%;
    margin-bottom: 3%;
  }

  ActionBar {
    height: 30em;
    background-color: black;
  }

  .LogoPhotoBox {
    margin-top: 5%;
    width: 300px;
  }

  .LabelInscritption {
    font-size: 20em;
    color: white;
  }
</style>

