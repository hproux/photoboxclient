<template lang="html">
  <Page>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <Label class="LabelMain" text="Créer un événement"/>
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
  import * as http from "http";
  export default {
    components:{
      BottomNav,
    },
methods: {
  create:function(){
    if(this.nom && this.adresse && this.description){
      http.request({
        url: "http://100.64.84.201/index.php/event",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        content: JSON.stringify({
          name : this.nom,
          date :this.date,
          location :this.adresse,
          public : this.public,
          description:this.description,
        })
      }).then(response => {
        console.log(response.content.toJSON());
      }, error => {
        console.log(error);
      });
    }else{
      alert("Champs non remplis !");
    }
    //this.$navigateTo(BottomNav);
  },
},
    created:function(){
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
  .datePicker{
    height:25%;

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
    font-size: 20em;
    color: white;
  }
</style>

