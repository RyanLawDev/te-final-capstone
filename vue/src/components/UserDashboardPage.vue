<template>
  <div>
      <band-item v-bind:band=band v-for="band in filterBands" v-bind:key="band.id"> </band-item>
    </div>

</template>

<script>
import bandItem from './BandItem.vue';
export default {
  computed: {
    filterBands() {

      return this.$store.state.bands.filter((band) => {
       

        return this.$store.state.follows.includes(band.id);


      });
    }
  }
}
</script> 

<style scoped>

</style>