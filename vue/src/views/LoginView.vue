<template>
    <p id="tagline">Echo is music</p>
    <div id="login">
      <form v-on:submit.prevent="login" v-if="this.$store.state.token == ''">
        <h1 >Please Sign In</h1>
        <div role="alert" v-if="invalidCredentials">
          Invalid username and password!
        </div>

        <div role="alert" v-if="this.$route.query.registration">
          Thank you for registering, please sign in.
        </div>

        <div class="form-input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" required autofocus />
        </div>
        <div class="form-input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>

        <button type="submit">Sign in</button>
        <p>
        <router-link v-bind:to="{ name: 'register' }">Need an account? Sign up.</router-link></p>
      </form>
      </div>
      <div id="features">FEATURES</div>
      <div id="bandCardLoginContainer">
      <band-card id="bandCardLogin" v-bind:band=band v-for="band in this.$store.state.bands" v-bind:key="band.id"> </band-card> 
    </div>
    
    <div id="events">EVENTS</div>
    <div id="audio">AUDIO</div>

  
    <!-- <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputUsername">Username</label>
        <input type="text" class="form-control" id="exampleInputUsername" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div role="alert" v-if="invalidCredentials">
        Invalid username OR password. 
      </div>
      <div role="alert" v-if="this.$route.query.registration">
        Thank you for registering, please sign in.
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <div>
        <router-link v-bind:to="{ name: 'register' }">Need an account? Sign up.</router-link>
      </div>
    </form> -->

  
</template>






<script>
import authService from "../services/AuthService";
import BandCard from "../components/BandCard.vue";

export default {
  components: {
    BandCard
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      invalidCredentials: false
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/dashboard");
          }
        })
        .catch(error => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    }
  },
  computed: {
    filterBands() {

      return this.$store.state.bands.filter((band) => {


        return this.$store.state.follows.includes(band.id);


      });
    }
  }
};
</script>

<style scoped>
.form-input-group {
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
}

#login{
  display: flex;
  justify-content:center;
  align-items: center;

}
#tagline {
  display: flex;
  justify-content:center;
  align-items: center;
}
#bandCardLoginContainer {
  display: flex;
  justify-content:center;
  align-items: center;
}
#bandCardLogin {
  display: flex;
  justify-content:center;
  align-items: center;
}
#features {
  display: flex;
  justify-content:center;
  align-items: center;
}
#events {
  display: flex;
  justify-content:center;
  align-items: center;
}
#audio {
  display: flex;
  justify-content:center;
  align-items: center;
}
</style>