<template>
    <div>
        <button id="followButton" class="btn btn-outline-dark" v-on:click.stop="followBand"
              v-bind:disabled="this.$store.state.token == ''"> {{'Follow'}}
        </button>
    </div>
</template>


<script>
//this.$store.state.follows.includes(band.id) ? 'Unfollow': 'Follow' 


import BandService from '../services/BandService.js';

export default {
    props: [
        'bandId'
    ],

    methods: {
        followBand() {
            
            BandService.createFollow(this.bandId).then((response) => {

            console.log(response.data);

            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

}


</script>


<style scoped>




</style>
