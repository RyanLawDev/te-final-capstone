export default {
    async getArtistInfo(userString, access_token) {
        const response = await fetch("https://api.spotify.com/v1/search?q=artist%3A" + userString + "&type=artist&limit=50&offset=0", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    },
    async getArtistById(artistId, access_token) {
        const response = await fetch("https://api.spotify.com/v1/artists/" + artistId, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    },
    async getAlbumByArtist(artistId, access_token) {
        const response = await fetch("https://api.spotify.com/v1/artists/" + artistId + "/albums?limit=10&offset=0", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    },
    async getTracksByAlbum(albumId, access_token) {
        const response = await fetch("https://api.spotify.com/v1/albums?ids=" + albumId + "&limit=50", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    },
    async getMBID(spotifyId) {
        const response = await fetch("http://musicbrainz.org/ws/2/url/?query=url:https://open.spotify.com/artist/" + spotifyId,  {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });

        return await response.json();
    },
    async getLinks(mbId) {
        const response = await fetch("http://musicbrainz.org/ws/2/url/?query=targettype:artist%20AND%20targetid:" + mbId + "&limit=5", {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });

        return await response.json();
    },
    async getSingles(artistId, access_token) {
        const response = await fetch("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    },
    // async getSetlist(mbId) {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Accept", "application/json");
    //     myHeaders.append("x-api-key", 'RaxRdUsePhwNEqjiKwbhkuzDifMFWqgBQlI3');
    //     const response = await fetch("https://api.setlist.fm/rest/1.0/artist/" + mbId + "/setlists", {
            
    //         method: 'GET',
    //         headers: myHeaders,
    //     });
    //     return await response.json();
    // },
    async getEvents(mbId, offset) {
        const response = await fetch("http://musicbrainz.org/ws/2/event/?query=arid:" + mbId + "&offset=" + offset, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });
        return await response.json();
    }
}