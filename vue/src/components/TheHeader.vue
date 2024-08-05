<template>
  <nav>
    <div id="nav">
      <router-link v-bind:to="{ name: 'home' }">Home</router-link>&nbsp;|&nbsp;
      <input type="text" name="bandName" id="bandName" placeholder="Search for artists .." v-model="this.$store.state.bandFilter" v-if="isSearchPage"  v-on:keyup.enter="sendASearch">

      <router-link v-bind:to="{ name: 'bands' }" v-model="this.$store.state.bandFilter" v-if="isSearchPage">Search Artists &nbsp;|&nbsp;</router-link>
      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''">Logout</router-link>
    
    </div>
 

         
<!-- <router-link v-bind:to="{ name: 'about' }">
        <button type="button" class="btn btn-outline-primary">About</button>
      </router-link>
      <router-link v-bind:to="{ name: 'search' }">
        <button type="button" class="btn btn-outline-primary">Roster</button>
      </router-link>
      <router-link v-bind:to="{ name: 'addplayer' }">
        <button type="button" class="btn btn-outline-primary">Add Player</button>
      </router-link>
      <router-link v-bind:to="{ name: 'login' }" v-if="$store.state.token == ''">
        <button type="button" class="btn btn-outline-primary">Login</button>
      </router-link>
      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''">
        <button type="button" class="btn btn-outline-primary">Logout</button>
      </router-link> -->
    </nav>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    computed: {
        isSearchPage() {
            return this.$route.name != "bands"
        }
    },
    methods:{
      sendASearch(){
        if(this.$store.state.bandFilter !=""){
          this.$router.push({name: 'bands'})
        }
      }
    }

}
</script>

<style>

</style>