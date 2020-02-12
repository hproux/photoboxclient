<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <FlexboxLayout class="FlexBoxLogo" alignItems="center" alignContent="center" flexDirection="column">
      <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png" />
      <Label class="LabelPhotoBox" text="PhotoBox"/>
      <Label class="LabelText" text="Souvenez-vous de vos soirées"/>
      <Button class="Btn BtnConnexion" text="Se connecter" @tap="login"/>
      <Button class="Btn BtnRegister" text="Commencer" @tap="register"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import Login from "./Login.vue";
  import BackArrow from "./BackArrow.vue";
  import Register from "./Register.vue";


  export default {
  components:{
    BackArrow,
    Login,
  },
  data() {
    return {
    }
  },
  methods: {
    login:function(){
      this.$navigateTo(Login);
    },
    register:function(){
      this.$navigateTo(Register);
    }
  },
}
</script>

<style lang="scss" scoped>

.Btn{
  width : 90%;
  border-radius: 100%;
  font-size: 20em;
}

.BtnConnexion{
  margin-top: 35%;
  margin-bottom: 2%;
  color : white;
  background-color: #604591;
}

.BtnRegister{
  background-color: white;
  color: #604591;
}

ActionBar{
  height:30em;
  background-color: black;
}

.LogoPhotoBox{
  width:300px;
}

.LabelText{
  color:white;
  font-size: 17em;
  font-style: italic;
}

.LabelPhotoBox{
  font-size:50em;
  color:white;
}

.FlexBoxLogo{
  margin-top: 20%;
}
</style>
