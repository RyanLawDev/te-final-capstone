<template>
    <div>
        <music-search />
        <music-search-service />
    </div>
</template>
  
<script>

import MusicSearch from '../components/MusicSearch.vue';
import MusicSearchService from '../services/MusicSearchService.js';

export default {
    created() {
        const client_id = this.$store.state.client_id
        const client_secret = this.$store.state.client_secret
        MusicSearchService.getToken(client_id,client_secret).then(response => {
            if (response.status == 200) {
                this.$store.commit("SET_SPOTIFY_TOKEN", response.data.access_token)
            }
        })
    },
    components: {
        MusicSearch,
        MusicSearchService
    },
    methods: {
        getTrack() {
            MusicSearchService
                .getToken().then(response => {
                    MusicSearchService
                        .getTrackInfo(response.access_token).then(profile => {
                            console.log(profile)
                        })

                })
        }
    }
}
</script>

<style scoped></style>