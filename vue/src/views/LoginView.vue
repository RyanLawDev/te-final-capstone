<template>
        <div id="page">
        <div id="background-image"></div>
        <div id="login">
          <form v-on:submit.prevent="login" class="login-form">
      <h1 class="form-title">Please Sign In</h1>
      <div role="alert" v-if="invalidCredentials" class="alert alert-error">
        Invalid username and password!
      </div>

      <div role="alert" v-if="this.$route.query.registration" class="alert alert-info">
        Thank you for registering, please sign in.
      </div>

      <div class="form-input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username" required autofocus class="form-input" />
      </div>
      <div class="form-input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password" required class="form-input" />
      </div>

      <button type="submit" class="form-button">Sign in</button>
      <p class="form-footer">
        <router-link v-bind:to="{ name: 'register' }" class="form-link">Need an account? Sign up.</router-link>
      </p>
    </form>

   
    </div>
  </div>
  <footer class="footer">

  </footer>

</template>






<script>
import authService from "../services/AuthService";
import BandService from "../services/BandService";

export default {
  components: {
    
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
            this.refresh();
            this.$router.push("/dashboard");
          }
        })
        .catch(error => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    },

    refresh() {
BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
    }).catch(error => {
      console.log(error)
    });
    }
  },
  
  // created() {
  //   authService.getSpotifyToken().then((response) => response.json())
  //     .then((result) => {
  //       console.log(result.access_token)
  //       this.$store.commit("SET_SPOTIFY_TOKEN", result.access_token)
  //       console.log(this.$store.state.spotifyToken)

  //     })
  //     .catch((error) => console.error(error))
  // }

};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#page {
  display: flex;
  flex-direction: column;
  min-height: 89vh;
  
}
.form-input-group {
  margin-bottom: 1rem;
}
.footer {
  padding: 1rem;
  text-align:center;
}

label {
  margin-right: 0.5rem;
}

#login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  

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

#background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723498762/mwry1vetlxbfku5nu3qw.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.6; 
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index: -1; 
  filter:grayscale();
}
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
}

.form-input-group {
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

.form-input:focus {
  border-color: #80bdff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

.form-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #0b4251;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}

.form-button:hover {
  background-color: #000;
}

.form-footer {
  margin-top: 1rem;
  text-align: center;
}

.form-link {
  color: #007bff;
  text-decoration: none;
}

.form-link:hover {
  text-decoration: underline;
}

</style>