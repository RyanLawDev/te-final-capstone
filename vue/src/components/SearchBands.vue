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
    data() {
        return {
            bands: [
                {
                    id: 1001,
                    name: 'echo',
                    album: 'wow guys',
                    members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
                    img_url: ['stuff'],
                    genres: ['hard'],
                    socials: ['insta', 'twitter', 'facebook']
                },
                {
                    id: 1002,
                    name: 'brian',
                    album: 'wow guys',
                    members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
                    img_url: ['stuff'],
                    genres: ['rock', 'hard'],
                    socials: ['insta', 'twitter', 'facebook']
                },
                {
                    id: 1003,
                    name: 'echo and the bunny man ',
                    album: 'wow guys',
                    members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
                    img_url: ['stuff'],
                    genres: ['electronic'],
                    socials: ['insta', 'twitter', 'facebook']
                }
            ]
        }
    },
    computed: {
        filterBands() {

            return this.bands.filter((band) => {
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

    }

};
</script>
<style scoped>



</style>
  