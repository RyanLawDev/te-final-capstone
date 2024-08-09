
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
    async getTrackByAlbum(albumName, artistName, access_token) {
        const response = await fetch("https://api.spotify.com/v1/search?q=album%3A" + encodeURIComponent(albumName) + "%2520artist%3A" + encodeURIComponent(artistName) + "&type=track&limit=10&offset=0", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        return await response.json();
    }

}