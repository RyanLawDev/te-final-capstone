<template>
  <body>
    <div id="login">


      <form v-on:submit.prevent="login">
        <h1>Please Sign In</h1>
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
          <router-link v-bind:to="{ name: 'register' }">Need an account? Sign up.</router-link>
        </p>
      </form>
   
    </div>
  </body>
</template>






<script>
import authService from "../services/AuthService";
//import BandCard from "../components/BandCard.vue";

export default {
  components: {
    //BandCard
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
  },
  created() {
    authService.getSpotifyToken().then((response) => response.json())
      .then((result) => {
        console.log(result.access_token)
        this.$store.commit("SET_SPOTIFY_TOKEN", result.access_token)
        console.log(this.$store.state.spotifyToken)

      })
      .catch((error) => console.error(error))
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

#login {
  display: flex;
  justify-content: center;
  align-items: center;

}

#tagline {
  display: flex;
  justify-content: center;
  align-items: center;
}

#bandCardLoginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

#bandCardLogin {
  display: flex;
  justify-content: center;
  align-items: center;
}

#features {
  display: flex;
  justify-content: center;
  align-items: center;
}

#events {
  display: flex;
  justify-content: center;
  align-items: center;
}

#audio {
  display: flex;
  justify-content: center;
  align-items: center;
}

body {

  height: 90vh;
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723057687/lgghhapemdvkbeld2bmp.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;


}</style>