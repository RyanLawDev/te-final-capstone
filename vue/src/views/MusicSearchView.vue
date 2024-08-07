<template>
    <div>
        <music-search />
    </div>
</template>
  
<script>

import MusicSearch from '../components/MusicSearch.vue';
import AuthService from '../services/AuthService';

export default {
    created() {
        AuthService.getSpotifyToken().then((response) => response.json())
      .then((result) => {
        this.$store.commit("SET_SPOTIFY_TOKEN", result.access_token)
        console.log(this.$store.state.spotifyToken)

    })
      .catch((error) => console.error(error))
        // (response => {
        // const spTok = response.access_token
        // })
        // console.log(spTok)
        // this.$store.commit("SET_SPOTIFY_TOKEN", spTok)
        // console.log(this.$store.state.spotifyToken)
    },
    components: {
        MusicSearch,
    },
    methods: {
        
    }
}
</script>

<style scoped></style>