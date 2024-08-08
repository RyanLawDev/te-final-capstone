<template>
    <div>
        <h2>Search an Artist</h2>
        <input type="text" name="userString" id="userString" placeholder="Search for Artists .." v-model="this.userString">
        <button v-on:click="getInfo" type="button" class="btn btn-outline-primary">SEARCH</button>

        <div v-show="info != {}">
            <p> {{ info }}</p>
        </div>
    </div>
</template>
  
<script>

import MusicSearchService from '../services/MusicSearchService.js';

export default {

    data() {
        return {
            userString: '',
            info: []
        }
    },
    methods: {
        getInfo() {
            this.info = [];
            const spotify_token = this.$store.state.spotifyToken;
            console.log(spotify_token);
            MusicSearchService.getArtistInfo(this.userString, spotify_token).then(response => {
                for (let i = 0; i < response.artists.items.length; i++) {
                    this.info.push(
                        this.artistId = response.artists.items[i].id,
                        this.artistName = response.artists.items[i].name,
                        this.genre = response.artists.items[i].genres,
                        this.images = response.artists.items[i].images,
                        this.externalUrl = response.artists.items[i].external_urls
                    )
                }
            })
        }
    }
};
</script>
  
<style></style>