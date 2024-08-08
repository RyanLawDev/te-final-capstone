<template>
  <div id="bandItem">
    <band-item
      v-bind:band="band"
      v-for="band in filterBands"
      v-bind:key="band.id"> </band-item>
  </div>
</template>

<script>
import BandItem from "./BandItem.vue";
import BandService from "../services/BandService";

export default {
  components: {
    BandItem,
  },

  computed: {
    filterBands() {
      return this.$store.state.bands.filter((band) => {
        return this.$store.state.follows.includes(band.id);
      });
    },
  },
  created() {
        BandService.fetchFollows().then(response => {
            console.log(response);
            this.follows = response.data;
        });
    }
};
</script> 

<style scoped>


</style>