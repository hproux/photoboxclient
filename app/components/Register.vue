<template lang="html">
  <Page>
   <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <TabView tabBackgroundColor="transparent" androidSelectedTabHighlightColor="transparent" selectedTabTextColor="transparent"
             tabTextColor="transparent" :selectedIndex="selectedIndex">
      <TabViewItem>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <FlexboxLayout class="fullWidth" flexDirection="row">
            <BackArrow/>
          <Label class="LabelInscritption LabelInscritption1" text="Inscritption"/>
          </FlexboxLayout>
          <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png"/>
          <TextField class="TextField TextFieldName" v-model="nom" hint="Nom"/>
          <TextField class="TextField" v-model="prenom" hint="Prénom"/>
          <Label class="TextField TextFieldBirth" text="Date de naissance"/>
          <DatePicker :maxDate="maxDate" v-model="date"/>
          <Button class="Btn BtnSuivant" text="Suivant" @tap="next"/>
        </FlexboxLayout>
      </TabViewItem>
      <TabViewItem>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <Label class="LabelInscritption" text="Inscritption"/>
          <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png"/>
          <TextField class="TextField TextFieldMobile" keyboardType="datetime" v-model="mobile" hint="Téléphone"/>
          <TextField class="TextField2" v-model="mail" hint="mail"/>
          <TextField class="TextField2" secure="true" v-model="password" hint="Mot de passe"/>
          <TextField class="TextField2" secure="true" v-model="passwordVerif" hint="Confirmer le mot de passe"/>

          <Button class="Btn BtnRetour" text="Retour" @tap="back"/>
          <Button class="Btn BtnRegister" text="Terminer" @tap="register"/>

        </FlexboxLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
  import Login from "./Login.vue";
  import BackArrow from "./BackArrow.vue";
  import formatDate from "../utils/formatDate";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const loader = new LoadingIndicator();
  const options = {
    message: "Création du compte",
    details: 'Veuillez patienter...',
    userInteractionEnabled: false,
  };
  export default {
    components:{
      BackArrow,
      Login,
    },
methods: {
  next:function(){
    this.selectedIndex=1;
  },
  register:function(){
    let that = this;
    if (that.nom && that.prenom && that.mobile && that.mail && that.password && (that.password==that.passwordVerif)) {
      loader.show(options);
      that.$axios.post("user", {
        nom: that.nom,
        prenom: that.prenom,
        date_naiss: formatDate.dateToYearMonthDay(that.date),
        tel: that.mobile,
        mail: that.mail,
        mdp: that.password
      }).then((response) => {
        console.log(response.data);
        that.$navigateTo(Login);
      }).catch((err) => {
        console.log(err.response.request._response);
        loader.hide();
      });
    } else {
      alert("Champs non remplis !");
    }
  },
  back: function () {
    this.selectedIndex = 0;
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
      date: null,
      maxDate: new Date(),
    }
  },
    created(){
      this.date = new Date();
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

.LabelInscritption1 {
  margin-left:25%;
}
</style>

