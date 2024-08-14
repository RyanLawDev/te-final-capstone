<template>
    <div class="card">
        <img v-bind:src="artistUrl" class="card-img" alt="Artist Image">
        <div class="card-body">
            
            <h5 class="card-title">{{ artist.name }}</h5>
            <div class="genres">
                <small v-for="genre in artist.genres" v-bind:key="genre" class="genre-chip">
                    {{ genre }}
                </small>
            </div>
            <router-link class="band-page-button" v-bind:to="{ name: 'bandPage', params: { id: band.id } }">Band
                Page</router-link>
        </div>
    </div>
</template>

<script>
import MusicSearchService from '../services/MusicSearchService';

export default {
    props: [
        'band'

    ],
    data() {
        return {
            artist: {},
            artistUrl: ''

        }
    },
    methods: {
        toggleFollow(bandId) {
            this.$store.commit("TOGGLE_FOLLOW", bandId)
        }
        
    },
    computed: {
        isDisabled() {
            return this.$store.state.token == ''
        },
    },
    mounted() {
        const bandId = this.band.id;
        const spotify_token = this.$store.state.spotifyToken;
        MusicSearchService.getArtistById(bandId, spotify_token).then(response => {
            this.artist = (response)
            this.artistUrl = (response.images[0].url)
        }
        )
    }

};
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 18rem; 
    background-color: #ebeddf; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    overflow: hidden;
    
}

.card-img {
    width: 100%;
    height: 180px; 
    object-fit: cover; 
}

.card-body {
    padding: 16px;
    text-align: center; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    width: 100%;
}

.card-title {
    font-size: 1.4rem; 
    margin: 12px 0;
}

.genres {
    display: flex; 
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 12px;
    justify-content: center;
    min-height: 40px;
    
}
.genre-chip {
    display: inline-block;
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 5px 10px;
    margin: 2px;
    font-size: 0.875rem;
    color: #333;
}

.band-page-button {
    display: inline-block;
    margin-top: 12px;
    padding: 8px 16px;
    font-size: 0.875rem;
    color: #fff;
    background-color: #0B4251;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}

.band-page-button:hover {
    background-color: black;
}
/* #follow-button {
    display: inline-block;
    margin-top: 12px;
    padding: 8px 16px;
    font-size: 0.875rem;
    color: black;
    background-color: #f2c864;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
#follow-button:hover {
    background-color: black;
    color: #fff;
} */



.card {
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    background-color:#fcf5e5;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); 
    /* animation: pulse 2s infinite; Pulsing effect */
}
</style>
