<template>
    <div>
        <h1 class ="band-name">{{ band.name }}</h1>
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
