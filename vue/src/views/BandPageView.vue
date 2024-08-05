<template>
  <div>
    <band-page v-bind:band="band"/>
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
      band: {},
    };
  },
  methods: {
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
