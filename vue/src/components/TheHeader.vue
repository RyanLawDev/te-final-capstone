<template>
  <nav>
    <div id="nav">
      <router-link v-bind:to="{ name: 'home' }">Home</router-link>&nbsp;|&nbsp;
      <input type="text" name="bandName" id="bandName" placeholder="Search for bands ..">
      <router-link v-bind:to="{ name: 'bands' }">Search Bands</router-link>&nbsp;|&nbsp;
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
    }
}
</script>

<style>

</style>