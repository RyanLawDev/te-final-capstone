import axios from 'axios';

//const apiKey = "?api_key=Gt53JZCtJPHVfecMOgQg4n0fRAW64TBPBrydnl4W"

export default {

    getArtistData() {
        return axios.get('https://musicbrainz.org/ws/2/artist/?query=ac%5C%2Fdc');
    }

}

