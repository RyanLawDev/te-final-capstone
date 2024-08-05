<template>
  <div>
    <band-page />
  </div>
</template>
  
  <script>
import BandPage from "../components/BandPage.vue";

export default {
  components: {
    BandPage,
  },
  data() {
    return {
      bandId: this.$route.params.id,
      band: {},
    };
  },
  method: {
    getBandById(id) {
      this.band = this.$store.state.bands.find((band) => band.id == id);
    }
  },
  created() {
    this.getBandById(this.$route.params.id);
  },
};
</script>

<style scoped>
</style>
