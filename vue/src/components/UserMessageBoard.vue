<template>
    <div class="messages-container">
<div class="row">
<div class="col-md-8">
	<div class="chat_container">
		<div class="job-box">
			<div class="job-box-filter">
				<div class="row">
					<!-- <div class="col-md-6 col-sm-6">
					<label>Show 
					<select name="datatable_length" class="form-control input-sm">
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option>
					</select>
					entries</label>
					</div> -->
					<!-- <div class="col-md-6 col-sm-6"> -->
						<div class="title-messages">
							<label>My Messages:</label>
						</div>
					<!-- </div> -->
				</div>
			</div> 
			<div class="inbox-message">
				<ul>
					
                        <li  v-for="notification in this.$store.state.notifications"
                            v-bind:key="notification.notificationId"> 
                            <notification-card id="notificationCards" v-bind:notification="notification" />
                        </li>
                </ul>
                    
					
				
			</div>
		</div>
	</div>
</div>
</div>
</div>
</template>

<script>
import NotificationCard from './NotificationCard.vue';
import BandService from '../services/BandService';
import MusicSearchService from '../services/MusicSearchService';

export default {
    components: {
        NotificationCard
    },
    data() {
    return {
      clicked: false,
      artist: {},
      bands: [],
      pageReady : false
    };
  },

  methods: {
    displayBands() {
      
      
    BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        const spotify_token = this.$store.state.spotifyToken;
        MusicSearchService.getArtistById(
          this.$store.state.follows[i].bandId,
          spotify_token
        ).then((response) => {
          this.artist = response;
          this.artistUrl = response.images[0].url;
          this.artistSpotifyUrl = response.external_urls.spotify;
          this.bands.push(this.artist);
          console.log(this.artist.bandId)
        });
      }
    }).catch(error => {
      console.log(error)
    });
    },


    
    
      
    
    getBands() {
      BandService.getNotifications()
        .then((response) => {
          this.$store.state.notifications = response.data;
          console.log('notifications set');
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },

  computed: {

  },

    created() {
      this.displayBands()
      this.getBands()
  }
    
}
</script>

<style scoped>

body{
margin-top:20px;
background-color:#eee;
}

.title-messages {
    text-align: left;
}

.col-md-8 {
    width: 95%;
    padding: 16px 0px 0px 0px
}
/*================================
Filter Box Style
====================================*/
.job-box-filter label {
    width: 100%;
}
.job-box-filter select.input-sm {
    display: inline-block;
    max-width: 100%;
    margin: 0 5%;
    border: 1% solid #e8eef1;
    border-radius: 2%;
    height: 34%;
    font-size: 15%;
}
.job-box-filter label input.form-control {
    max-width: 67%;
    display: inline-block;
    border: 1px solid #e8eef1;
    border-radius: 2px;
    height: 34px;
    margin-left:5px;
    font-size: 15px;
}
.text-right{
text-align:right;
}
.job-box-filter {
    padding: 12px 15px;
    background: #ffffff;
    border-bottom: 1px solid #e8eef1;
    margin-bottom: 20px;
}
.job-box {
    background: #ffffff;
    display: inline-block;
    width: 100%;
    padding: 0px 0px 40px 0px;
    border: 1px solid #e8eef1;
}
.job-box-filter a.filtsec {
    margin-top: 8px;
    display: inline-block;
    margin-right: 15px;
    padding: 4px 10px;
    font-family: 'Quicksand', sans-serif;
	transition: all ease 0.4s;
    background: #edf0f3;
    border-radius: 50px;
    font-size: 13px;
    color: #81a0b1;
    border: 1px solid #e2e8ef;
}
.job-box-filter a.filtsec.active {
    color: #ffffff;
    background: #16262c;
	border-color:#16262c;
}
.job-box-filter a.filtsec i {
    color: #03A9F4;
    margin-right: 5px;
}
.job-box-filter a.filtsec:hover, .job-box-filter a.filtsec:focus {
    color: #ffffff;
    background: #07b107;
    border-color: #07b107;
}
.job-box-filter a.filtsec:hover i, .job-box-filter a.filtsec:focus i{
color:#ffffff;
}
.job-box-filter h4 i {
    margin-right: 10px;
}

/*=====================================
Inbox Message Style
=======================================*/
.inbox-message ul {
    padding: 0;
    margin: 0;
}
.inbox-message ul li {
    list-style: none;
    position: relative;
    padding: 15px 20px;
	border-bottom: 1px solid #e8eef1;
}
.inbox-message ul li:hover, .inbox-message ul li:focus {
    background: #eff6f9;
}
.inbox-message .message-avatar {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
}
.message-avatar img {
    display: inline-block;
    width: 54px;
    height: 54px;
    border-radius: 50px;
}
.inbox-message .message-body {
    margin-left: 85px;
    font-size: 15px;
    color:#62748F;
}
.message-body-heading h5 {
    font-weight: 600;
	display:inline-block;
    color:#62748F;
    margin: 0 0 7px 0;
    padding: 0;
}
.message-body h5 span {
    border-radius: 50px;
    line-height: 14px;
    font-size: 50%;
    color: #fff;
    font-style: normal;
    padding: 4% 10%;
    margin-left: 5%;
    margin-top: -5%;
}
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
    line-height: 2px;
    font-size: 15px;
}

a:hover{
    text-decoration:none;
}


</style>