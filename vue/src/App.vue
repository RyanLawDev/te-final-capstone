<template>
  <div id="capstone-app">
    <the-header if="header"/>
    <router-view />
    <the-footer id="footer"/>
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

<style scoped>
#capstone-app {
  display: flex;
  flex-direction: column;
}

#header {

  position: fixed;

}



</style>