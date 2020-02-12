<template lang="html">
  <Page>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <Label class="LabelMain" text="Créer un événement"/>
          <TextField class="TextField TextFieldName" :text="nom" hint="Nom"/>
          <TextField class="TextField" :text="adresse" hint="Adresse"/>
          <Label class="TextField TextFieldDate" text="Date de l'événement"/>
          <DatePicker class="datePicker" :date="date"/>
            <TextView class="TextViewDescription" hint="Description"/>
          <FlexboxLayout flexDirection="row">
            <Label class="LabelPublic" text="Public"/>
            <Switch offBackgroundColor="#614fa5" color="white" class="switch" :checked="public"/>
          </FlexboxLayout>
          <Button class="BtnCreate" text="Créer" @tap="create"/>
        </FlexboxLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";

  export default {
    components:{
      BottomNav,
    },
methods: {
  create:function(){
    this.$navigateTo(BottomNav);
  },
},
  data() {
    return {
      nom: null,
      adresse: null,
      public : true,
      date: Date(),
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

