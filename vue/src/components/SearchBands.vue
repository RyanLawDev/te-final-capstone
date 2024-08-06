<template>
    <div>

        <input type="text" name="bandName" id="bandName" placeholder="Search for bands .." v-model="this.$store.state.bandFilter">
        <div>
            <band-item v-bind:band=band v-for="band in filterBands" v-bind:key="band.id"> </band-item>
            
        </div>

    </div>
</template>
  
<script>
import bandItem from './BandItem.vue';

export default {
    components:{
        bandItem,
    },
    
    computed: {
        filterBands() {

            return this.$store.state.bands.filter((band) => {
                let filteredBand = false;
                    band.genres.forEach((genre) => {
                            if (!filteredBand) {
                                filteredBand = genre.includes(this.$store.state.bandFilter);
                            }
                        });

                            if (!filteredBand) {
                                filteredBand = band.name.includes(this.$store.state.bandFilter)
                            }

                            return filteredBand;
                
                
            });
        }

    },
    methods: {
        clearSearch() {
            this.bandFilter = "";
        }
    }
    

};
</script>
<style scoped>



</style>
  