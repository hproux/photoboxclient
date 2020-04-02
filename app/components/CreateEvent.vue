<template lang="html">
  <Page>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <FlexboxLayout class="fullWidth" flexDirection="row">
            <BackArrow/>
            <Label class="LabelMain" text="Créer un événement"/>
          </FlexboxLayout>
          <TextField class="TextField TextFieldName" v-model="nom" hint="Nom"/>
          <TextField class="TextField" v-model="adresse" hint="Adresse"/>
          <Label class="TextField TextFieldDate" text="Date de l'événement"/>
          <DatePicker class="datePicker" :minDate="dateToday" v-model="date"/>
            <TextView class="TextViewDescription" v-model="description" hint="Description"/>
          <FlexboxLayout flexDirection="row">
            <Label class="LabelPublic" text="Public"/>
            <Switch offBackgroundColor="#614fa5" color="white" class="switch" v-model="public"/>
          </FlexboxLayout>
          <Button class="BtnCreate" text="Créer" @tap="create"/>
        </FlexboxLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import BackArrow from "./BackArrow.vue";
  import formatDate from "../utils/formatDate";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const loader = new LoadingIndicator();
  const options = {
    message: "Création de l'évènement",
    details: 'Veuillez patienter...',
    userInteractionEnabled: false,
  };
  export default {
    components:{
      BottomNav,
      BackArrow
    },
methods: {
  create(){
    let that = this;
    if(that.nom && that.adresse && that.description){
      loader.show(options);
      that.$axios.post("event", {
        name : that.nom,
        date :formatDate.dateToYearMonthDayHourMinutes(that.date),
        location :that.adresse,
        public : that.public,
        description:that.description
      }).then((response) => {
        loader.hide();
        console.log(response.data);
        that.$navigateTo(BottomNav);
      }).catch((err) => {
        console.log(err.response.request._response);
        loader.hide();
        alert("Une erreur est survenue");
      })
    }else{
      alert("Champs non remplis !");
    }
  },
},
    created(){
      this.date = new Date();
    },
  data() {
    return {
      nom: null,
      adresse: null,
      public : true,
      date: null,
      description : null,
      dateToday: Date(),
    }
  }
}
</script>

<style lang="scss" scoped>

  .datePicker {
    height: 25%;
  }
  .LabelPublic{
    font-size: 17em;
    margin-top:2%;
    color : white;
  }

.TextViewDescription{
  margin-top:15px;
  border-color : white;
  border-width: 3px;
  border-radius: 15px;
  width:90%;
  color : white;
  font-size: 15em;
  padding-left:10em;
  placeholder-color: white;
}

  .BtnCreate {
    width: 80%;
    border-radius: 100%;
    color : white;
    background-color: #614fa5 ;
    font-size: 20em;
    margin-top: 5%;
  }

  .TextFieldName{
    margin-top:5%;
      margin-bottom: 3%;
  }

  .TextFieldDate {
      margin-top: 3%;
      text-align: center;
  }

  .TextField {
    color: white;
    width: 80%;
    placeholder-color: white;
    font-size: 15em;
  }

  .LabelMain {
    margin-top : 3%;
    margin-left:15%;
    font-size: 20em;
    color: white;
  }
</style>

