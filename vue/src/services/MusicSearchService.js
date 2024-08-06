import axios from 'axios';


export default {
    //  async getToken(client_id, client_secret) {
    //     const item = encodeURIComponent(`'grant_type' : 'client_credentials'`)
    //     const response = await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         // body: new URLSearchParams({
    //         //     'grant_type': 'client_credentials',
    //         // }),
    //         body: item.toString,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic ' + (client_id + ':' + client_secret),
    //         },
    //     });

    //     // fetch('https://accounts.spotify.com/api/token', {
    //     //     method: 'POST',
    //     //     body: new URLSearchParams({
    //     //         'grant_type': 'client_credentials',
    //     //     }),
    //     //     headers: {
    //     //         'Content-Type': 'application/x-www-form-urlencoded',
    //     //         'Authorization': 'Basic ' + (client_id + ':' + client_secret),
    //     //     },
    //     // }).then(response=> {
    //     //     const res = response.json()
    //     //     console.log(res)
    //     //     return res
    //     // }).catch(error => {
    //     //     console.log(error)
    //     // });


    //     return await response.json();
    // },
    async getToken(client_id, client_secret) {
        let buf = (client_id + ':' + client_secret).toString('base64');
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + ('NmRmYmY4N2Q0YjY3NGI0N2JiMmE5MjdjZTMxYmY2NmE6Nzk4NGNiMDJlOGI0NGM2Yzk1ODJlNzdkM2EzNTA4ODI='),
            },
        });
        return await response.json();
    },
    async getTrackInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    });

    return await response.json();
},
getArtistData() {
    return axios.get('https://musicbrainz.org/ws/2/artist/?query=ac%5C%2Fdc');
}
}