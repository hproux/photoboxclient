<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <StackLayout>
      <FlexboxLayout class="upBar" flexDirection="row">
        <Image v-if="lastImg" class="backArrow" @tap="closeModal" src="~/img/left-arrow.png" stretch="none"/>
        <Label class="Label LabelNom" v-model="$props.event.item.name"/>
      </FlexboxLayout>

      <AbsoluteLayout class="MsgBox">
        <Image class="Img" :src="lastImg"/>
        <Label class="Label LabelNom" v-model="this.lastMessage"/>
      </AbsoluteLayout>
      <TextView class="TextViewComment" hint="Votre commentaire..." v-model="comment"/>
      <Button text="Ajouter commentaire" class="BtnAddComment" @tap="addComment"  padding="10"/>

      <Button text="Prendre une photo" class="Btn" @tap="onTakePictureTap"  padding="10"/>
    </StackLayout>
  </Page>
</template>

<script>

import { takePicture, requestPermissions } from "nativescript-camera";
import {ImageSource} from "@nativescript/core";
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();
const timerModule = require("tns-core-modules/timer");

const options = {
  message: "Envoi de la photo",
  details: 'Veuillez patienter...',
  userInteractionEnabled: false,
};

const options2 = {
  message: "Chargement de l'image",
  details: 'Veuillez patienter...',
  userInteractionEnabled: false,
};
export default {
  props: ['event'],
  data() {
    return {
      cameraImage: null,
      comment:null,
      base64 : null,
      lastImg:null,
      loaderImg : null,
      lastMessage : null,
    }
  },
  created(){
    loader.show(options2);
    this.getLastEventImage();
    loader.hide();
    this.loaderImg = timerModule.setInterval(() => {
      console.log("Chargement de la derniere image / dernier commentaire");
      this.getLastEventComment();
      this.getLastEventImage();
    }, 5000)
  },
  methods: {
    closeModal(){
      timerModule.clearInterval(this.loaderImg);
      this.$modal.close();
    },
    onTakePictureTap:function(args){
      let that = this;
      requestPermissions().then(() => {
        takePicture({ width: 320, height: 240, keepAspectRatio: true, saveToGallery: false, allowsEditing: false }).
        then((imageAsset) => {
          that.cameraImage = imageAsset;
          let source = new ImageSource();
          source.fromAsset(imageAsset).then((src) => {
             that.base64 = src.toBase64String("jpg",100);
             that.base64 = "data:image/jpeg;base64,"+that.base64;
           that.sendImg();
          },
          (err) => {
            console.log("Error -> " + err.message);
            loader.hide();
          });
                },
      (err) => {
        console.log("Error -> " + err.message);
      });
    },
    () => {
      alert('permissions rejected');
    }
    );
  },
    sendImg(){
      console.log("test");
      let that = this;
      that.$axios.post("picture/event/"+that.event.item.token, {
        picture: that.base64,
      }).then((response) => {
        console.log(response.data);
        that.getLastEventImage();
      }).catch((err) => {
        console.log(err.response.request._response);
        loader.hide();
        alert("Une erreur est survenue");
      })
    },
    getLastEventImage(){
      let that = this;
      that.$axios.get("event/picture/last/"+that.event.item.token
      ).then((response) => {
        that.lastImg = this.$axios.defaults.baseURL + response.data.picture.URI;
      }).catch((err) => {
        console.log(err.response.request._response);
        alert("Une erreur est survenue");
      })
    },
    getLastEventComment(){
      let that = this;
      that.$axios.get("event/comment/last/"+that.event.item.token
      ).then((response) => {
        that.lastMessage = response.data.pseudo + ": "+ response.data.comment;
      }).catch((err) => {
        console.log(err.response.request._response);
        alert("Une erreur est survenue");
      })
    },
    addComment(){
      if(this.comment!=null || this.comment!=""){
        this.$axios.post("event/comment/"+this.event.item.token, {
          comment: this.comment,
        }).then((response) => {
          console.log(response.data);
          this.comment = "";
        }).catch((err) => {
          console.log(err.response.request._response);
          alert("Une erreur est survenue");
        })
      }else{
        alert("Veuillez écrire un commentaire!");
      }
    }
}
};
</script>

<style scoped lang="scss">
  .upBar{
    margin-top:4%;
    margin-bottom: 5%;
  }

  .Label{
    color:white;
    font-size:17em;
    overflow: auto;
    text-overflow: ellipsis;
  }

  .LabelNom{
    font-size: 25px;
      margin-left:16%;
  }

  .Btn{
    width : 90%;
    border-radius: 100%;
    font-size: 20em;
    margin-top: 1%;
    color : white;
    background-color: #604591;
  }

  .BtnAddComment{
    color: #604591;
    background-color: white ;
    width : 90%;
    border-radius: 100%;
    font-size: 20em;
    margin-top: 2%;
  }

  .Img{
    /*width:95%;*/
    height:50%;
  }

  .TextViewComment{
    margin-top:2%;
    color:white;
    font-size:17em;
    border-color: white;
    border-radius: 20px;
    border-width:2px;
    padding:10%;
    width:95%;
    placeholder-color:white;
  }

  .TextViewComment::placeholder{
    color:white;
  }

  .MsgBox{

  }
</style>
