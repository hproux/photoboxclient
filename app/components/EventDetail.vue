<template lang="html">
    <Page actionBarHidden="true">
        <StackLayout v-if="isEdit">
            <FlexboxLayout v-if="isOwner" justifyContent="space-between">
                <Image class="backArrow" @tap="closeModal" src="~/img/left-arrow.png" stretch="none"/>
                <Image class="ImgEdit" @tap="edit" horizontalAlignment="right" src="~/img/pen.png"/>
            </FlexboxLayout>

            <Image v-else class="backArrow" @tap="closeModal" src="~/img/left-arrow.png" stretch="none"/>

            <StackLayout class="bordered">
                <Image class="ImgEvent" src="~/img/user.png"/>
            </StackLayout>

            <Label horizontalAlignment="center" class="Label LabelNom" v-model="$props.event.item.name"/>

            <StackLayout class="main">
                <FlexboxLayout class="infos" flexDirection="row" justifyContent="space-between">
                    <FlexboxLayout flexDirection="row">
                        <Image class="ImgPin" src="~/img/pin.png"/>
                        <Label horizontalAlignment="center" class="Label" color="#DDD" v-model="$props.event.item.location"/>
                    </FlexboxLayout>
                    <Label horizontalAlignment="center" class="Label" color="#DDD" :text="event.item.date"/>
                </FlexboxLayout>

                <StackLayout>
                    <TextView class="TextView" editable="false" v-model="$props.event.item.description"/>
                </StackLayout>

            <Button v-if="isPublic && !download" class="Btn" text="Rejoindre" @tap="joinPublicEvent"/>
            <Button v-if="!isPublic" class="Btn" text="Voir" @tap="seeEvent"/>
            <Button v-if="download" class="Btn" text="Voir toutes les images" @tap="downloadArchive"/>
            <Button v-if="isOwner" class="Btn" text="Supprimer" @tap="deleteMyEvent"/>

            </StackLayout>
        </StackLayout>

        <StackLayout v-else class="edit">
            <TextField class="input" v-model="nom"/>
            <TextField class="input" v-model="adresse"/>

            <Label class="lbl" :text="dateTime"/>
            <Button class="" text="Choisir une date" @tap="selectDate"/>
            <Button class="" text="Choisir une heure" @tap="selectTime"/>

            <TextView class="input" v-model="description"/>
            <Button class="Btn" text="Sauvegarder" @tap="save"/>
        </StackLayout>
    </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import BackArrow from "./BackArrow.vue";
  import TakePhoto from "./TakePhoto";
import formatDate from "../utils/formatDate";
  import ImagesList from "./ImagesList";
  const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
  const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
  const MDTPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
  const mDtpicker = new MDTPicker();
  const loader = new LoadingIndicator();
  const options = {
      message: "Ajout de l'évènement",
      details: 'Veuillez patienter...',
      userInteractionEnabled: false,
  };
  export default {
    props: ['event', 'isPublic', 'isOwner', 'download'],
    components: {
        BackArrow,
        BottomNav,
        TakePhoto,
        ImagesList
    },
      methods:{
          downloadArchive(){
              let that = this;
              console.log(that.event.item.token);
              that.$axios.get("event/pictures/"+that.event.item.token
              ).then((response) => {
                  that.images = response.data.pictures;
                  this.$showModal(ImagesList, { fullscreen: true, props: { images: that.images}});
              }).catch((err) => {
                  console.log(err.response.request._response);
                  alert("Une erreur est survenue");
              })
          },
          closeModal(){
              this.$modal.close();
          },
          joinPublicEvent(){
              let that = this;
              loader.show(options);
              that.$axios.post("event/join/public/"+this.event.item.token).then((response) => {
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

        transformDate(date){
            return date.split(' ')[0];

        },

        seeEvent(){
            this.closeModal();
            this.$showModal(TakePhoto, { fullscreen: true, props: { event: this.event }});
        },

        deleteMyEvent(){
            let dialogs = require("tns-core-modules/ui/dialogs");
            dialogs.confirm("Etes vous sur de vouloir surrpimer cet événement ?").then( (result) => {
                loader.show(options);
                this.$axios.delete("event/" + this.event.item.token).then((response) => {
                    loader.hide();
                    console.log(response.data);
                    this.closeModal();
                    that.$navigateTo(BottomNav);

                }).catch((err) => {
                    console.log(err.response.request._response);
                    loader.hide();
                    alert("Une erreur est survenue");
                })
            });
          },

        edit(){
            this.isEdit = false;
        },

        save(){
            loader.show(options);
            if(this.nom && this.adresse && this.adresse && this.dateTime ){
                if(!this.date || !this.time){
                    let tabDate = this.dateTime.split(' ');
                    this.date = tabDate[0];
                    this.time = tabDate[1];
                }
                 this.$axios.put("event/" + this.event.item.token, {
                    name: this.nom,
                    date: this.date + " " + this.time,
                    location: this.adresse,
                    description: this.description,
                }).then(response => {
                    loader.hide();
                    this.isEdit = true;
                    this.$store.commit('toggleRefresh');
                    this.closeModal();
                }).catch((err) => {
                    console.log(err.response.request._response);
                    loader.hide();
                    alert("Une erreur est survenue");
                })
            }
        },

        selectDate() {
            mDtpicker.pickDate({
            title: "Choisir la date de l'évènement",
            minDate: new Date(),
            }).then((result) => {
                this.date = result.day + "/" + result.month + "/" + result.year;
            this.dateTime = "Date de l'évènement: " + this.date+ " "+this.time;

            console.log("Date is: " + result.day + "-" + result.month + "-" + result.year);
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
                this.time = result.hour + ":" + result.minute;
                this.dateTime = "Date de l'évènement: " + this.date + " "+this.time;
                console.log("Time is: " + result.hour + ":" + result.minute);
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
        }
      },

    data() {
        return {
            isEdit: true,
            nom: this.event.item.name,
            adresse: this.event.item.location,
            description: this.event.item.description,
            dateTime: this.event.item.date,
            date: null,
            time: null,
            images : [],
        };
    },
}
</script>

<style lang="scss" scoped>
    .Btn{
        border-radius: 100%;
        font-size: 20em;
        color : white;
        background-color: #604591;
        margin-top: 150px;
    }

    .ImgPin{
        width:64px;
    }
    .ImgEvent{
        border-radius: 100%;
        width: 400px;
    }

    .bordered{
        border-color: white;
        border-width: 10px;
        border-style: solid;
        border-radius: 100%;
        width: 400px;

    }

    .main{
        margin: auto;
        width: 90%;
    }

    .edit{
        margin: auto;
        width: 90%;
        margin-top: 20%;
        color: white;
    }

    .input::placeholder{
        color: white;
    }

    .Label{
        color:white;
        font-size:16em;
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

    .TextView{
        border-width: 0;
        color: white;
        font-size:20em;
    }

    .ImgEdit{
        margin-right:5%;
        margin-top:5%;
        width:128px;
    }

    .lbl{
        margin-left: 4%;
        margin-top: 50px;
    }
</style>
