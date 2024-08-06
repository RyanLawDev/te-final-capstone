<template>
  <div class="bandContainer">
    
    <div id="bandName" type="text"> {{ band.name }}</div>
    <ul id="theUL">
    <div id="bandMembers" v-bind:band=band v-for="member in band.members" v-bind:key="member"> {{ member }} </div>
    </ul>
    <div id="bandDescription"> {{ band.description }} {{ band.image }}</div>
  

  </div>
</template>

<script>
export default {
    props: ['band'],
    

}
</script>

<style scoped>
.bandContainer {
  display: flex;


};
#bandName {
  font-size: 300px;
};
#bandMembers {

};
#theUL {
  display: flex;
  font-size: ;

}
/* #bandDescription {
  
} */


</style>