<template>
    <div>
        <form v-on:submit.prevent="sendNotification">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="message" class="form-label">Message to Followers</label>
                    <input type="textarea" class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="message">
                </div>

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
            message : ''
        }
    },
    methods: {
        sendNotification() {
            BandService.addNotification(this.message);
            this.message = '';
        }
    }
}

</script>

<style scoped>



</style>