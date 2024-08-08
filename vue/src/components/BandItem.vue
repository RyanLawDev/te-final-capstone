<template>
  <router-link href="#" v-bind:to="{name : 'bandPage', params: {id : band.id}}">
 <div id="bandItem" class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded" style="max-width: 95vw;">
<div class="row g-0">
 <div class="col-md-4">
   <img v-bind:src="band.images.length > 0 ? band.images[0].url : '...'" alt="Band Image" class="img-fluid rounded-start" >
 </div>
 <div class="col-md-8">
   <div class="card-body">
     <h3>
         {{band.name}}
         <p></p>
     <small class="text-body-secondary" v-for="genre in band.genres" v-bind:key="genre">{{ genre }}&nbsp;|&nbsp;</small>
     </h3>
     <a class="card-text" v-on:click.stop v-bind:href="link" target="_blank" v-for="link in band.external_urls" v-bind:key="link">Artist Spotify Page</a>
     <button class="btn btn-outline-dark"
        v-on:click.stop="toggleFollow(band.id)" v-bind:disabled="this.$store.state.token == ''"
     > {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' : 'Follow' }}
     </button>
   </div>
 </div>
</div>
</div>
</router-link>
</template>
<script>
export default {
 props: [
     'band'
 ],
 methods: {
     toggleFollow(bandId) {
         this.$store.commit("TOGGLE_FOLLOW", bandId)
     },
     stopPropagation(event) {
         event.stopPropagation();
     }
 }
};
</script>
<style scoped>
#bandImage{
  width: 150px;
  height: 150px;
}
#bandItem{

}



</style>