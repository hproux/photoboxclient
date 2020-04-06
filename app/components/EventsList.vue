<template lang="html">
  <Page actionBarHidden="true">
    <StackLayout>
      <ListView height="100%" for="item in items">
        <v-template>
          <FlexboxLayout class="item" alignItems="center" alignContent="center" flexDirection="row">
            <Image class="ImgEvent" src="~/img/user.png"/>
            <StackLayout>
                <FlexboxLayout justifyContent="space-between" flexDirection="row">
                  <Label class="LabelItem" :text="item.nom"/>
                  <Label class="LabelItem LabelEtat" text="inscrit"/>
                </FlexboxLayout>
              <FlexboxLayout class="fullWidth" justifyContent="space-between" flexDirection="row">
                <FlexboxLayout flexDirection="row">
                  <Image class="ImgPin" src="~/img/pin.png"/>
                  <Label class="LabelItem" :text="item.lieu"/>
                </FlexboxLayout>
                <Label class="LabelItem" :text="item.date"/>
              </FlexboxLayout>
            </StackLayout>
    </FlexboxLayout>
        </v-template>
      </ListView>
      </StackLayout>
  </Page>
</template>

<script>

  export default {
    data() {
      return {
        items:[
          {"nom" : "ParkWay Drive", "lieu": "Place Saint-Martion","date":"21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "Place Saint-Martion", "date": "21-01-2019"},
          {"nom": "ParkWay Drive", "lieu": "La Cale", "date": "21-01-2019"},

        ]
      }},

  methods: {

  }
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
  }

</style>

