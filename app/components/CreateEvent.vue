<template lang="html">
  <Page>
        <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
          <FlexboxLayout class="fullWidth" flexDirection="row">
            <Image class="backArrow" @tap="closeModal" src="~/img/left-arrow.png" stretch="none"/>
            <Label class="LabelMain" text="Créer un événement"/>
          </FlexboxLayout>
          <TextField class="TextField TextFieldName" v-model="nom" hint="Nom"/>
          <TextField class="TextField" v-model="adresse" hint="Adresse"/>
          <Label class="TextField TextFieldDate" :text="dateTime"/>
          <Button class="BtnPicker" text="Choisir une date" @tap="selectDate"/>
          <Button class="BtnPicker" text="Choisir une heure" @tap="selectTime"/>

          <TextView class="TextViewDescription" v-model="description" hint="Description"/>
          <FlexboxLayout flexDirection="row">
            <Label class="LabelPublic" text="Public"/>
            <Switch offBackgroundColor="#614fa5" color="white" class="switch" v-model="public"/>
          </FlexboxLayout>
          <Button class="BtnCreate" text="Créer" @tap="create"/>
          <ActivityIndicator :busy="isBusy"/>
        </FlexboxLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import BackArrow from "./BackArrow.vue";
  import formatDate from "../utils/formatDate";

  const MDTPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
  const mDtpicker = new MDTPicker();
  export default {
    components: {
      BottomNav,
      BackArrow
    },
    methods: {

      closeModal() {
        this.$modal.close();
      },
      selectDate() {
        mDtpicker.pickDate({
          title: "Choisir la date de l'évènement",
          minDate: new Date(),
        }).then((result) => {
          this.date = formatDate.datePickerToDate(result);
          this.dateTime = "Date de l'évènement: " + this.date + " " + this.time;
        })
                .catch((error) => {
                  console.log("Error: " + error);
                });
      },
      selectTime() {
        mDtpicker.pickTime({
          is24HourView: true,
          title: "Choisir l'heure de début",
        }).then((result) => {
          this.time = formatDate.timePickerToDate(result);
          this.dateTime = "Date de l'évènement: " + this.date + " " + this.time;
        })
                .catch((error) => {
                  console.log("Error: " + error);
                });
      },
      create() {
        let that = this;

        if (that.nom && that.adresse && that.description) {
          if (that.adresse.length < 5) {
            alert('L\'adresse doit contenir au moins 5 caractères');
            return;
          }
          if (that.description.length < 5) {
            alert('La description doit contenir au moins 5 caractères');
            return;
          }
          if(that.description.length>250){
            alert('La description doit contenir maximum 250 caractères');
            return;
          }
          if (that.time && that.date) {
            that.isBusy=true;
            that.$axios.post("event", {
              name: that.nom,
              date: that.date + " " + that.time,
              location: that.adresse,
              is_public: that.public,
              description: that.description
            }).then((response) => {
              that.isBusy=false;
              if(response.data.eventpass){
                alert("Votre clé privée: "+response.data.eventpass);
              }
              that.closeModal();
            }).catch((err) => {
              console.log(err.response.request._response);
              that.isBusy=false;
              alert("Une erreur est survenue");
            })
          } else {
            alert("La date est l'heure n'ont pas étés définis");
          }
        } else {
          alert("Champs non remplis !");
        }
      },
    },
    created() {
      this.dateTime = "Date de l'évènement";
      this.date = new Date();
    },
    data() {
      return {
        nom: null,
        adresse: null,
        dateTime : null,
        public : true,
        date: "",
        description : null,
        time : "",
        isBusy: false,
      }
    }
  }
</script>

<style lang="scss" scoped>

  .LabelPublic {
    font-size: 17em;
    margin-top: 2%;
    color: white;
  }

  .backArrow {
    margin-top: 3%;
  }

  .TextViewDescription {
    margin-top: 15px;
    border-color: white;
    border-width: 3px;
    border-radius: 15px;
    width: 90%;
    color: white;
    font-size: 15em;
    padding-left: 10em;
    placeholder-color: white;
  }

  .BtnCreate {
    width: 80%;
    border-radius: 100%;
    color: white;
    background-color: #614fa5;
    font-size: 20em;
    margin-top: 5%;
  }

  .BtnPicker {
    width: 80%;
    border-radius: 100%;
    color: #614fa5;
    background-color: white;
    font-size: 20em;
    margin-top: 1%;
  }

  .TextFieldName {
    margin-top: 5%;
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
    margin-top: 3%;
    margin-left: 15%;
    font-size: 20em;
    color: white;
  }
</style>

