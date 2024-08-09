<template>
  <div id="capstone-app">
    <the-header if="header" />
    <router-view id="viewport"/>
    <the-footer id="footer" />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
#capstone-app {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  
}

#header {

  position: fixed;

};
#viewport{
 
  
}

</style>