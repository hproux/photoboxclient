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
export default {
  data() {
    return {
      id : null,
      password : null,
    }
  },
  methods: {
    register:function(){

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
  color: white;
  border-color: white;
  border-bottom-width: 3px;
}


.LabelText{
  color:white;
  font-size: 17em;
  font-style: italic;
}

.LabelConnexion{
  font-size:20em;
  color:white;
  margin-top: 3%;
}
</style>
