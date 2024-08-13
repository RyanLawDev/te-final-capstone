<template>
  <div id="header"></div>
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
        <!-- <a class="navbar-brand" href="#">echo.</a> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link id="echo" class="nav-link active" aria-current="page" href="#"
              v-bind:to="{ name: 'home' }" v-on:click="clearBandFilter">.ECHO</router-link>
            </li>
            <li class="nav-item">
              <router-link v-bind:class="{ 'nav-link': isDisabled == true, 'nav-link disabled': isDisabled == false }"
              v-bind:to="{ name: 'login' }" id="login-button" href="#" tabindex="-1" aria-disabled="isDisabled" 
               :disabled="this.$store.state.token !== ''" v-on:click="clearBandFilter">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link v-bind:class="{ 'nav-link': isDisabled == false, 'nav-link disabled': isDisabled == true }"
                id="dashboard" href="#" tabindex="-1" aria-disabled="isDisabled" :disabled="this.$store.state.token == ''"
                v-bind:to="{ name: 'dashboard' }" v-on:click="clearBandFilter">Dashboard</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                More
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Events</a></li>
                <li><a class="dropdown-item" href="#">Audio</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Yo mama</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a v-bind:class="{ 'nav-link': isDisabled == false, 'nav-link disabled': isDisabled == true }"
                id="logout-button" href="#" tabindex="-1" aria-disabled="isDisabled" @click.prevent="logout"
                :disabled="this.$store.state.token == ''" v-on:click="clearBandFilter">Logout</a>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" aria-label="Search" placeholder="Search for artists .."
              v-model="this.$store.state.bandFilter" v-if="isSearchPage" v-on:keydown.prevent.enter="sendASearch">
            <router-link class="search-button" v-bind:to="{ name: 'bands' }"
              v-model="this.$store.state.bandFilter" v-if="isSearchPage" v-on:click="sendASearch">Search</router-link>
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
    isDisabled() {
      return this.$store.state.token == ''
    },
    isSearchPage() {
      return this.$route.name != "bands"
    }
  },
  methods: {
    clearBandFilter() {
      this.$store.commit('CLEAR_BAND_FILTER');
    },

    sendASearch() {
      if (this.$store.state.bandFilter != "") {
        this.$router.push({ name: 'bands' })
        
      }
    },
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/");
      this.$store.state.follows = [];
    }

  }

}
</script>

<style scoped>

/* Add these styles to TheHeader.vue */

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure this is higher than other elements */
  background-color: white; /* Optional, to make sure it's visible */
}

.navbar {
  position: relative;
  z-index: 1001; /* Higher than #header if necessary */
}



#navbar-navbar-expand-lg-navbar-light-bg-light {
  position: sticky;
}
#echo{
color:#0b4251;

}
.search-button{

  display: inline-block;
  margin-right: 16px;
  padding: 8px 16px;
  font-size: 0.875rem;
  color: black;
  background-color: white;
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
.search-button:hover {
  background-color: black;
  color: #fff;
}

</style>