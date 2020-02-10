<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
      <Label class="LabelConnexion" text="Connexion"/>
      <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png" />
      <TextField class="TextField TextFieldId" :text="id" hint="Identifiant"/>
      <TextField class="TextField" secure="true" :text="password" hint="Mot de passe"/>

      <Button class="Btn BtnConnexion" text="Se connecter" @tap="login"/>
      <Label class="TagRegister" @tap="register" text="Pas encore de compte ?"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import Register from "./Register.vue";


  export default {
    components:{
      BottomNav,
      Register,
    },
  data() {
    return {
      id : null,
      password : null,
    }
  },
  methods: {
    register:function(){
      this.$navigateTo(Register);
    },
    login:function(){
      this.$navigateTo(BottomNav);

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
  margin-top: 25%;
  margin-bottom: 2%;
  color : white;
  background-color: #604591;
}

.TextField{
  color: white;
  width:80%;
  placeholder-color:white;
  font-size: 15em;
}

.TextFieldId{
  margin-top:10%;
  margin-bottom: 3%;
}

ActionBar{
  height:30em;
  background-color: black;
}

.LogoPhotoBox{
  margin-top: 10%;
  width:300px;
}

.TagRegister{
  font-size: 17em;
  font-style: italic;
  color: white;
  border-color: white;
  border-bottom-width: 3px;
}

.LabelConnexion{
  font-size:25em;
  color:white;
  margin-top: 3%;
}
</style>
