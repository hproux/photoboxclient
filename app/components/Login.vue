<template lang="html">
  <Page>
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text=""></Label>
    </ActionBar>
    <FlexboxLayout alignItems="center" alignContent="center" flexDirection="column">
      <Label class="LabelConnexion" text="Connexion"/>
      <Image class="LogoPhotoBox" src="~/img/logoPhotoBox.png" />
      <TextField class="TextField TextFieldId" v-model="id" hint="Adresse mail"/>
      <TextField class="TextField" secure="true" v-model="password" hint="Mot de passe"/>

      <Button class="Btn BtnConnexion" text="Se connecter" @tap="login"/>
      <Label class="TagRegister" @tap="register" text="Pas encore de compte ?"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import BottomNav from "./BottomNav.vue";
  import Register from "./Register.vue";
  import * as http from "http";

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
      /*if (this.id && this.password) {
        http.request({
          url: this.$store.state.urlApi + "/index.php/login",
          method: "POST",
          headers: {"Content-Type": "application/json"},
          content: JSON.stringify({
            mail: this.id,
            mdp: this.password,
          })
        }).then(response => {
          if(response.statusCode!=200){
            alert("L'identifiant et le mot de passe ne correspondent pas.");
            this.id ="";
            this.password ="";
            return;
          }
          this.$store.commit('setToken', response.content.toJSON().token);
          console.log(this.$store.state.token);
          this.$navigateTo(BottomNav);
        }, error => {
          console.log(error);
        });
      } else {
        alert("Champs non remplis !");
      }*/
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
