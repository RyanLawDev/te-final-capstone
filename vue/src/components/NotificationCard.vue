<template>
  <div>
    <a href="#">
			<div class="message-avatar">
				<img v-bind:src="artistUrl" class="card-img" alt="Artist Image">
			</div>
			<div class="message-body">
				<div class="message-body-heading">
					<h5> {{ band.name }} </h5>
          
          
        </div>
				<p>{{ notification.message }}</p>
        <button id="button" v-on:click="removeNotification()">Delete Message</button>
        
			</div>
		</a>
    
  </div>
</template>

<script>
import BandService from '../services/BandService.js';
import MusicSearchService from "../services/MusicSearchService.js";

export default {
    props: [
        'notification'
    ],
    data() {
        return {
            artistUrl : '',
            band : {}
        }
    },

    methods: {
        findBand() {
        const spotify_token = this.$store.state.spotifyToken;
        MusicSearchService.getArtistById(
          this.notification.bandId,
          spotify_token
        ).then((response) => {
          this.band = response
          this.artistUrl = response.images[0].url
        });
        
    },

    removeNotification() {
        BandService.deleteNotification(this.notification).then(response => {
            BandService.getNotifications().then(response => {
                this.$store.state.notifications = response.data
            })
        })
    }
},


    created() {
        this.findBand()
    }
}
</script>

<style scoped>

.message-avatar {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
}

#button {
  border-radius: 50px;
    line-height: 14px;
    font-size: 12px;
    font-style: normal;
    padding: 4px 10px;
    margin-left: 5px;
    margin-top: -5px;
}
.message-avatar img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.message-body {
    margin-left: 85px;
    font-size: 100%;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color:black;
}

.message-body-heading {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 200%;
	  display:inline-block;
    color:black;
    margin: 0 0 7px 0;
    padding: 0;
}
/* .message-body h5 span {
    
    border-radius: 50px;
    line-height: 14px;
    font-size: 12px;
    color: #fff;
    /* font-style: normal; */
    /* padding: 4px 10px;
    margin-left: 5px;
    margin-top: -5px;
} */ 
.message-body h5 span.unread{
	background:#07b107;	
}
.message-body h5 span.important{
	background:#dd2027;	
}
.message-body h5 span.pending{
	background:#2196f3;	
}
.message-body-heading span {
    float: right;
    color:#62748F;
    font-size: 14px;
}
.messages-inbox .message-body p {
    margin: 0;
    padding: 0;
    line-height: 27px;
    font-size: 15px;
}

a:hover{
    text-decoration:none;
}



</style>