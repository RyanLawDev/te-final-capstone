<template>
  <div class="bandContainer">

    <div id="bandName" type="text"> {{ band.name }} <button v-on:click="toggleFollow(band.id)"
        v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' :
          'Follow' }}
      </button></div>
    <ul id="theUL">
      <div id="bandMembers" v-bind:band=band v-for="member in band.members" v-bind:key="member"> {{ member }} </div>
    </ul>
    <div id="bandDescription"> {{ band.description }} {{ band.image }}</div>


  </div>
</template>

<script>
export default {
  methods: {
    toggleFollow(bandId) {
      this.$store.commit("TOGGLE_FOLLOW", bandId)
    }
  },
  props: ['band'],


}
</script>

<style scoped>
.bandContainer {
  display: flex;


}

;

#bandName {
  font-size: 300px;
}

;

#bandMembers {
  font-size: 300px;
}

;

#theUL {
  display: flex;
  font-size: 300px;
}

/* #bandDescription {
  
} */</style>