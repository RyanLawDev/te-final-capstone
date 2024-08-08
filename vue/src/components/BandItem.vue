<template>
    <div class="card mb-3" style="max-width: 80vw;">
  <div class="row g-0">
    <div class="col-md-4">
      <img v-bind:src="band.images[0].url" alt="Band Image" class="img-fluid rounded-start" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ band.name }}</h5>
        <p class="card-text" v-for="genre in band.genres" v-bind:key="genre">{{ genre }}</p>
        <button
          v-on:click="toggleFollow(band.id)" v-bind:disabled="this.$store.state.token == ''"
        > {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' : 'Follow' }}
        </button>
        <router-link class="btn btn-primary" v-bind:to="{name : 'bandPage', params: {id : band.id}}">Band Page</router-link>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
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

<style scoped></style>
