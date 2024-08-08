<template>
    <div>
        <router-link v-bind:to="{name : 'bandPage', params: {id : band.id}}"> 
            {{ band.name }}
        </router-link>
        <img v-bind:src="band.images[0].url" alt="Band Image" />
        
    <button
          v-on:click="toggleFollow(band.id)" v-bind:disabled="this.$store.state.token == ''"
        > {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' : 'Follow' }}
        </button>
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

<style scoped></style>
