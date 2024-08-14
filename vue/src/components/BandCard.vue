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
            <router-link class="band-page-button" v-bind:to="{ name: 'bandPage', params: { id: band.id } }">View Artist</router-link>
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
    margin: 12px;
    width: 14rem; 
    background-color: #fff; 
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);  
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease;
}
.card:hover {
    transform: scale(1.05); 
}


.card-img {
    width: 100%;
    height: auto; 
    object-fit: cover; 
}

.card-body {
    padding: 10px;
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
    margin: 8px 0;
}

.genres {
    display: flex; 
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 4px;
    justify-content: center;
    min-height: 30px;
    
}
.genre-chip {
    display: inline-block;
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 4px 8px;
    margin: 2px;
    font-size: 0.875rem;
    color: #333;
}

.band-page-button {
    display: inline-block;
    margin-top: 8px;
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


</style>
