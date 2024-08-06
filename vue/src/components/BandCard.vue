<template>

        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <button v-on:click="toggleFollow(band.id)"> {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' :
                    'Follow' }}
                </button>
                <h5 class="card-title">{{ band.name }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>

                <router-link href="#" class="btn btn-primary" v-bind:to="{name : 'bandPage', params: {id : band.id}}">Band Page</router-link>
            </div>
        </div>
       
  
</template>

<script>
export default {
    props: [
        'band'

    ],
    methods: {
        toggleFollow(bandId) {
            this.$store.commit("TOGGLE_FOLLOW", bandId)
        }
    }
};
</script>

<style scoped>

</style>