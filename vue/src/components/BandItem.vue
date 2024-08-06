<template>
    <div>
        <router-link v-bind:to="{name : 'bandPage', params: {id : band.id}}"> 
            {{ band.name }}
        </router-link>
        <!-- <button v-on:click.prevent="toggleFollow(true)" v-if="!this.$store.state.follows.includes(this.band.id)" >Follow</button>
        <button v-on:click.prevent="toggleFollow(false)" v-if="this.$store.state.follows.includes(this.band.id)" >Unfollow</button>
    -->
    <button
          v-on:click="toggleFollow"
        > {{ this.$store.state.follows.includes(bandId) ? 'Unfollow' : 'Follow' }}
        </button>
    </div>
</template>

<script>
export default {
    props: [
        'band'

    ],
    methods: {
        toggleFollow() {
            this.$store.commit("TOGGLE_FOLLOW", this.band.id)
        }
    }
};
</script>

<style scoped></style>
