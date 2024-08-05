<template>
    <div>
        <router-link v-bind:to="{name : 'bandPage', params: {id : band.id}}"> 
            {{ band.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    props: [
        'band'

    ]
};
</script>

<style scoped></style>
