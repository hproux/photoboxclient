<template lang="html">
  <Page actionBarHidden="true">
    <StackLayout>
      <Image class="backArrow" @tap="closeModal" src="~/img/left-arrow.png" stretch="none"/>
      <ListView class="list" for="image in pictures">
        <v-template>
          <Image :src="image"/>
        </v-template>
      </ListView>
      </StackLayout>
  </Page>
</template>
<script>

  export default {
    props: ['images'],
    data() {
      return {
        pictures : [],
      }
    },
    methods:{
      closeModal(){
        this.$modal.close();
      },
    },
    created(){
      this.images.forEach((image)=>{
        this.pictures.push(this.$axios.defaults.baseURL + image.URI);
      });
    },

}
</script>

<style lang="scss" scoped>


.ImgEvent{
  border-radius: 100%;
  width: 400px;
}
.fullWidth{
  width:100%;
    }

.ImgPin{
  width:64px;
}
.LabelItem{
  color:white;
  font-size:17em;
}

  .item{
    background-color: transparent;
    padding-top: -80px;
    padding-bottom: -50px;
    border-color: white;
    border-style: solid;
    border-width: 1px;
  }

   .list{
    height: 100%;
  }

.backArrow{
  margin-top: 3%;
}
</style>

