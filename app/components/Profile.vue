<template lang="html">
    <Page actionBarHidden="true">
       <StackLayout>
           <Image class="ImgEdit" horizontalAlignment="right" src="~/img/pen.png"/>
           <Image class="ImgEvent" horizontalAlignment="center" src="~/img/user.png"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="LabelNom"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="tel"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="mail"/>
           <Label horizontalAlignment="center" class="LabelItem LabelLast" v-model="dateNaiss"/>
       </StackLayout>

    </Page>
</template>

<script>
export default {
    data: function() {
        return {
            LabelNom : this.$store.state.memberInfos.nom +" "+ this.$store.state.memberInfos.prenom,
            tel : this.$store.state.memberInfos.tel,
            mail : this.$store.state.memberInfos.mail,
            dateNaiss : this.$store.state.memberInfos.date_naiss,

        };
    }
}
</script>

<style lang="scss" scoped>
    .ImgEdit{
        margin-right:5%;
        margin-top:5%;
        width:128px;
    }

    .ImgEvent {
        border-radius: 100%;
        margin-top:5%;
        margin-bottom: 7%;
        width: 400px;
        background-color: white;
    }

    .LabelItem {
        color: white;
        font-size: 17em;
        margin-bottom : 3%;
        border-bottom-color: white;
        border-bottom-width: 3px;
        width : 70%;
        text-align: center;
        padding-bottom: 15em;
    }

    .LabelLast{
        border-bottom-width: 0px;
        border-bottom-color: transparent;
    }
</style>
