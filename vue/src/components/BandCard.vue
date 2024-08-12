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
        // toggleFollow(bandId) {
        //     this.$store.commit("TOGGLE_FOLLOW", bandId)
        // }
        
    },
    computed: {
        isDisabled() {
            return this.$store.state.token == ''
        }
    },
    created() {
        const bandId = this.band.id;
        const spotify_token = this.$store.state.spotifyToken;
        console.log(bandId);
        console.log(spotify_token);
        MusicSearchService.getArtistById(bandId, spotify_token).then(response => {
            console.log(response.images[0].url)
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
    margin: 20px; /* Space between cards */
    width: 18rem; /* Set a consistent width */
    background-color: #ebeddf; /* Set a background color for the card */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    overflow: hidden; /* Ensure content does not overflow */
    
}

.card-img {
    width: 100%; /* Full width */
    height: 180px; /* Fixed height for consistency */
    object-fit: cover; /* Ensure the image covers the area without distortion */
}

.card-body {
    padding: 16px; /* Internal padding */
    text-align: center; /* Center-align text */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    width: 100%;
}

.card-title {
    font-size: 1.25rem; /* Font size for title */
    margin: 12px 0; /* Margin around title */
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
#follow-button {
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

</style>
