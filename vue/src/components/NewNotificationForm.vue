<template>
    <div>
        <form v-on:submit.prevent="sendForm">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="message" class="form-label">Message to Followers</label>
                    <input type="textarea" class="form-control" id="message" v-model="notification.message">
                </div>

                <!-- HOW DO WE GET THE BAND ID FOR THIS NOTIFICATION??? -->

                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
            
        </form>

    </div>
</template>

<script>
import BandService from '../services/BandService';

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
    methods: {
        sendNotification() {
            BandService.addNotification(this.notification);
        }
    }
}

</script>

<style scoped>



</style>