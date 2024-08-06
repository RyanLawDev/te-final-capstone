<template>
  <div id ="bandCard">
      <band-card v-bind:band=band v-for="band in filterBands" v-bind:key="band.id"> </band-card>
    </div>

</template>

<script>

import BandCard from '../components/BandCard.vue';
export default {
  components: {
    BandCard
  },

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
#bandCard {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
</style>