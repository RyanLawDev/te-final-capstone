<template>
    <div>

        <input type="text" name="bandName" id="bandName" placeholder="Search for bands .." v-model="nameFilter">
        <div>
            <band-item v-bind:band=band v-for="band in filterBands" v-bind:key="band.id"> </band-item>
            
        </div>

    </div>
</template>
  
<script>
import bandItem from './BandItem.vue';

export default {
    components:{
        bandItem,
    },
    data() {
        return {
            nameFilter: '',
            bands: [
                {
                    id: 1001,
                    name: 'echo',
                    album: 'wow guys',
                    members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
                    img_url: ['stuff'],
                    genre: ['music genre', 'rock', 'hard'],
                    socials: ['insta', 'twitter', 'facebook']
                },
                {
                    id: 1002,
                    name: 'brian',
                    album: 'wow guys',
                    members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
                    img_url: ['stuff'],
                    genre: ['music genre', 'rock', 'hard'],
                    socials: ['insta', 'twitter', 'facebook']
                },
                {
                    id: 1003,
                    name: 'echo and the bunnymen',
                    album: 'wow guys',
                    members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
                    img_url: ['stuff'],
                    genre: ['music genre', 'rock', 'hard'],
                    socials: ['insta', 'twitter', 'facebook']
                }
            ]
        }
    },
    computed: {
        filterBands() {

            return this.bands.filter((band) => {
                return this.nameFilter == '' ? true : band.name.includes(this.nameFilter);
            });
        }

    }

};
</script>
  