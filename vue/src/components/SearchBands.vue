<template>
    <div>
        <div class="form-floating mb-3">
        <h1>Filter Search:
        <input  class="form-control" id="floatingInput" type="text" name="bandName" placeholder="Search for bands .." v-model="this.$store.state.bandFilter"> 
        </h1>
        </div>
        <div>
            <band-item v-bind:band=band v-for="band in this.artist" v-bind:key="band.id" > </band-item>
            
            
        </div>

    </div>
</template>
  
<script>
import bandItem from './BandItem.vue';
import MusicSearchService from '../services/MusicSearchService';

export default {
    data() {
        return {
            artist: []
        }
    },
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
    },
    created() {
        if(this.$store.state.bandFilter != '') {
            console.log(this.$store.state.bandFilter)
            this.artist = [];
            const spotify_token = this.$store.state.spotifyToken;
            console.log(spotify_token);
            MusicSearchService.getArtistInfo(this.$store.state.bandFilter, spotify_token).then(response => {
                for(let i = 0; i<response.artists.items.length; i++) {
                    
                this.artist.push(response.artists.items[i]
                    // this.artistId = response.artists.items[i].id,
                    // this.artistName = response.artists.items[i].name,
                    // this.genre = response.artists.items[i].genres,
                    // this.images = response.artists.items[i].images,
                    // this.externalUrl = response.artists.items[i].external_urls
                    )
                }
            })
        }
    }
    

};
</script>
<style scoped>

.form-control {
    width: 50%;
}



</style>
  