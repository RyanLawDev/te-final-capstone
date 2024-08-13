<template>
    <div>
        <form v-on:submit.prevent="sendForm">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="message" class="form-label">Message to Followers</label>
                    <input type="textarea" class="form-control" id="message" v-model="notification.message">
                </div>

                
                <!-- <div class="col-auto">
                    <label for="position" class="form-label">Position:</label>
                    <select v-model="selectedValue" class="form-select" aria-label="Default select example">
                        <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>

                <div class="col-auto">
                    <label for="imageUrl" class="form-label">Image Url</label>
                    <input type="text" class="form-control" id="imageUrl">
                </div> -->

                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
            
        </form>

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
    }
}

</script>

<style scoped>



</style>