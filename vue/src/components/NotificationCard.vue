<template>
  <div>
    <div class="card">
        <img v-bind:src="artistUrl" class="card-img" alt="Artist Image">
        <div class="card-body">
            <h5 class="card-title">{{ artist.name }}</h5>
            <div class="message">
                {{ notification.message }}
            </div>
            <router-link class="band-page-button" v-bind:to="{ name: 'bandPage', params: { id: band.id } }">Band
                Page</router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        notification : {
            message : '',
            bandId : '',
            notificationId : ''
        }
        }
    },


}
</script>

<style>

</style>