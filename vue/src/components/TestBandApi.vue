<template>
  <div>
    <button  v-on:click="retrieveBands" type="button">get bands</button>
    <p>{{ bands }}</p>

  </div>
</template>

<script>
import testBandApiService from '../services/TestBandApiService.js'

export default {
    

    data() {
        return {
            bands: {}

        }
        

    },

    methods: {
        retrieveBands() {
            this.bands = testBandApiService.getBands();
        }

    }
}
</script>

<style>

</style>