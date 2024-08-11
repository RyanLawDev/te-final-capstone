
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
        const response = await fetch("http://musicbrainz.org/ws/2/url/?query=url:https://open.spotify.com/artist/" + spotifyId, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });

        return await response.json();
    },
    async getLinks(mbId) {
        const response = await fetch("http://musicbrainz.org/ws/2/url/?query=targettype:artist%20AND%20targetid:" + mbId, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        });

        return await response.json();
    }

    

}