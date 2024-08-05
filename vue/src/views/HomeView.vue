<template>
  <div class="home">
    <h1>Home</h1>
    <p>You must be authenticated to see this</p>
    <TestBandApi/>
  </div>
</template>

<script>
import TestBandApi from '../components/TestBandApi.vue';
export default {
  components: {
    TestBandApi
  }
};
</script>
