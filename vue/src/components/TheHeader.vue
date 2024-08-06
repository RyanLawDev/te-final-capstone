<template>
  <nav>
    <!-- <div id="nav">
      <router-link v-bind:to="{ name: 'login' }" v-if="isLoginPage">Login &nbsp;|&nbsp;</router-link>
      <input type="text" name="bandName" id="bandName" placeholder="Search for artists .." v-model="this.$store.state.bandFilter" v-if="isSearchPage"  v-on:keyup.enter="sendASearch">

      <router-link v-bind:to="{ name: 'bands' }" v-model="this.$store.state.bandFilter" v-if="isSearchPage">Search Artists &nbsp;|&nbsp;</router-link>
      <router-link v-bind:to="{ name: 'dashboard' }" v-if="isDashboardPage">Dashboard &nbsp;|&nbsp;</router-link>
        <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''" >Logout</router-link>
      <img src="..." class="img-thumbnail" alt="..."> -->
    
 

         
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" href="#" v-bind:to="{ name: 'login' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" href="#" v-bind:to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
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
        },
        isDashboardPage() {
            return this.$route.name != "dashboard"
        },
        isLoginPage() {
            return this.$route.name != "login"
        },
        isLogoutPage() {
            return this.$route.name != "logout"
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