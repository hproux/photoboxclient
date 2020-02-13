<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>

    <GridLayout rows="auto, *, auto, auto">
      <StackLayout row="0" orientation="vertical" padding="5">
        <StackLayout orientation="horizontal" row="0" padding="5">
          <Label text="saveToGallery" />
          <Switch v-model="saveToGallery"/>
        </StackLayout>
        <StackLayout android:visibility="collapsed" orientation="horizontal" row="0" padding="5">
          <Label text="allowsEditing" />
          <Switch v-model="allowsEditing"/>
        </StackLayout>
        <StackLayout orientation="horizontal" row="0" padding="5">
          <Label text="keepAspectRatio" />
          <Switch v-model="keepAspectRatio"/>
        </StackLayout>
        <StackLayout orientation="horizontal" padding="5">
          <Label text="width"></Label>
          <TextField hint="Enter width" keyboardType="number" v-model="width" class="input"></TextField>
          <Label text="height"></Label>
          <TextField hint="Enter height" keyboardType="number" v-model="height" class="input"></TextField>
        </StackLayout>
      </StackLayout>
      <Image row="1" :src="cameraImage" id="image" stretch="aspectFit" margin="10"/>
      <Button row="2"  :isEnabled="isThereImg" text="Envoi API" @tap="ApiSend"  padding="10"/>
      <Button row="3"  text="Take Picture" @tap="onTakePictureTap"  padding="10"/>
    </GridLayout>
  </Page>
</template>

<script>
import * as http from "http";
import { EventData, Observable, fromObject } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { View } from 'tns-core-modules/ui/core/view';
import { takePicture, requestPermissions } from "nativescript-camera";
import {ImageSource} from "@nativescript/core";
export default {
  data() {
    return {
      saveToGallery: false,
      allowsEditing: true,
      keepAspectRatio: true,
      width: 320,
      height: 240,
      cameraImage: null,
      isThereImg:false,
      base64 : null,
    }
  },
  methods: {
    onTakePictureTap: function(args) {
      let page = (args.object).page;
      requestPermissions().then(
      () => {
        takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing }).
        then((imageAsset) => {
          this.cameraImage = imageAsset;
          let source = new ImageSource();
             source.fromAsset(imageAsset).then((src) => {
            this.base64 = src.toBase64String("jpg",100);
            this.base64 = "data:image/jpeg;base64,"+this.base64;
          },
          (err) => {
            console.log("Error -> " + err.message);
          });
      },
      (err) => {
        console.log("Error -> " + err.message);
      });
    },
    () => alert('permissions rejected')
    );
    if(this.cameraImage!==""){
      this.isThereImg = true;
    }
  },
  ApiSend: function(){
    http.request({
      url: this.$store.state.urlApi+"/index.php/picture",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        picture: this.base64,
      })
    }).then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
};
</script>

<style scoped lang="scss">

</style>
