<template lang="html">
    <Home/>
</template>

<script>
import Home from "./Home.vue";

export default {
  components: {
      Home,
  }
};
</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/purple";
// End custom common variables

// Custom styles
Page{
  background: linear-gradient(200deg, #BD5DCD,#824AA7,#604591,#3F2D86,#362472);
}

.fullWidth{
    width:100%;
    backgroud-color:red;
}

Label, Button, TextField{
    font-family: Calibri;
}

ActionBar{
  height:30em;
  background-color: black;
}
</style>
