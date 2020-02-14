<template lang="html">
    <Page actionBarHidden="true">
       <StackLayout>
           <Image class="ImgEdit" horizontalAlignment="right" src="~/img/pen.png"/>
           <Image class="ImgEvent" horizontalAlignment="center" src="~/img/user.png"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="LabelNom"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="tel"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="mail"/>
           <Label horizontalAlignment="center" class="LabelItem" v-model="dateNaiss"/>
           <Label horizontalAlignment="center" class="LabelItem LabelLast" v-model="grade"/>

       </StackLayout>

    </Page>
</template>

<script>
export default {
    data: () => {
        return {
            LabelNom : "Nom et Prénom",
            tel : "0654875465",
            mail : "test",
            dateNaiss : "13/09/1995",
            grade : "modérateur",

        };
    }
}
</script>

<style lang="scss" scoped>
    .ImgEdit{
        margin-right:5%;
        margin-top:3%;
        width:128px;
    }

    .ImgEvent {
        border-radius: 100%;
        margin-top:5%;
        margin-bottom: 5%;
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
