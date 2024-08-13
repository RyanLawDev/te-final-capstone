<template>
  <div>
    <div class="card">
        <img v-bind:src="artistUrl" class="card-img" alt="Artist Image">
        <div class="card-body">
            <h5 class="card-title">{{ band.name }}</h5>
            <div class="message">
                {{ notification.message }}
            </div>
            <router-link class="band-page-button">Band
                Page</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
    props: [
        'bands',
        'notification'
    ],
    data() {
        return {
            band : {}
        }
    },

    computed: {
        findBand() {

            for (let i = 0; i < this.bands.length; i++) {
                if (this.notification.bandId == this.bands[i].id) {
                    band= this.bands[i]
                }
            }
            return bandId;
        }
    }

}
</script>

<style>

</style>