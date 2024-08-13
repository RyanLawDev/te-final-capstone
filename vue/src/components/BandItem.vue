<template>
  <div id="whole-card">
    <router-link href="#" v-bind:to="{ name: 'bandPage', params: { id: band.id } }" v-on:click="clearBandFilter">
      <div id="bandItem" class="card" style="max-width: 95vw;">
        <div id="card" class="row g-0">
          <div class="col-md-4">
            <img id="bandImage" v-bind:src="band.images.length > 0 ? band.images[0].url : this.$store.state.altImage" v-bind:alt="'band image'"
              class="img-fluid rounded">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3>
                {{ band.name }}
                <p></p>
                <div class="genres">
                  <small v-for="genre in band.genres" v-bind:key="genre" class="genre-chip">
                    {{ genre }}
                  </small>
                </div>
              </h3>

              <button id="follow-button" class="btn btn-outline-dark" v-if="!followed" v-on:click.stop="followBand"
                v-bind:disabled="this.$store.state.token == ''">Follow
              </button>
              <button id="unfollow-button" class="btn btn-outline-dark" v-else v-on:click.stop="unFollowBand"
                v-bind:disabled="this.$store.state.token == ''">Unfollow
              </button>
              <button id="spotify-link" class="btn btn-outline-dark" v-on:click.stop="openLink(link)" v-bind:href="link"
                target="_blank" v-for="link in band.external_urls" v-bind:key="link">Spotify</button>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>

import BandService from '../services/BandService';

export default {
  props: [
    'band'
  ],
  components: {
    
  },
  data() {
        return {
          bandId: this.band.id
        }

    },
  computed: {
    followed(){
      let isFollowed = false;
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        if(this.$store.state.follows[i].bandId === this.bandId) {
          isFollowed = true;
        }
      }
      return isFollowed;
    },
    followId() {
      let theFollowId = 0;
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        if(this.$store.state.follows[i].bandId === this.bandId) {
          theFollowId = this.$store.state.follows[i].id;
        }
      }
      return theFollowId;
    }
  },
  methods: {
    clearBandFilter() {
      this.$store.commit('CLEAR_BAND_FILTER');
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    openLink(url) {
      window.open(url, '_blank');
    },
    followBand() {
            console.group(this.$store.state.user)
            BandService.createFollow(this.bandId).then((response) => {

              console.log("Created!");
              console.log(response.data);
              BandService.fetchFollows().then(response => {
                console.log('fetched after follow created!')
                console.log(response.data);
                this.$store.commit("SET_USER_FOLLOWS", response.data);
                console.log('data set in store')
                console.log(this.$store.state.follows);
              }).catch(error => {
                console.log(error)
              });
            })
            .catch((error) => {
                console.log(error)
            });
            
        },
    unFollowBand() {
            
            BandService.deleteFollow(this.followId).then((response) => {

              console.log("Deleted!");
              console.log(response.status);
              BandService.fetchFollows().then(response => {
                console.log('fetched after follow deleted!')
                console.log(response.data);
                this.$store.commit("SET_USER_FOLLOWS", response.data);
                console.log('data set in store')
                console.log(this.$store.state.follows);
              }).catch(error => {
                console.log(error)
              });
            })
            .catch((error) => {
                console.log(error)
            });
            
        }
  }

};
</script>

<style scoped>
#whole-card {
  display:grid;
  gap: 16px;
  padding: 16px;

  overflow: hidden;

}

#bandImage {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  align-items: center;
  margin-left:1em;
  object-fit:cover;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  padding: 1em;
  
}

#bandItem {
  grid-area: card-link;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fcf5e5;
  overflow: hidden;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  
}

a {
  text-decoration: none;
}


#spotify-link {
    display: inline-block;
    margin-top: 12px;
    padding: 8px 16px;
    font-size: 0.875rem;
    color: black;
    background-color: #1DB954;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
#spotify-link:hover {
    background-color: black;
    color: #fff;
}

#follow-button {
    display: inline-block;
    margin-top: 12px;
    margin-right: 16px;
    padding: 8px 16px;
    font-size: 0.875rem;
    color: black;
    background-color: white;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
#follow-button:hover {
    background-color: black;
    color: #fff;
}
#unfollow-button {
    display: inline-block;
    margin-top: 12px;
    margin-right: 16px;
    padding: 8px 16px;
    font-size: 0.875rem;
    color: white;
    background-color: #0B4251;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
#unfollow-button:hover {
    background-color: black;
    color: #fff;
}

.genres {
  display: flex; 
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
  justify-content: center;
  min-height: 40px;
  overflow:hidden;
}
.genre-chip {
    display: inline-block;
    background-color: #e0e0e0;
    border-radius: 12px;
    padding: 5px 10px;
    margin: 2px;
    font-size: 0.875rem;
    color: #333;
  
}



</style>

