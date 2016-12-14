import 'whatwg-fetch';

export default class UserApi {

    static addUser(auth0_id) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            // let user_data = {
            //     user_id: profile.user_id
            //     // add the rest here
            // };

            //const body = JSON.stringify(user_data);

            return fetch('/api/users', {
                method: 'POST',
                headers: headers,
                body: auth0_id
                })
                .then(response => {
                    response.json();
                })
                .then(user => {
                    resolve(user);
                });
        });
    }

    static getUserByAuth0Id(auth0_id) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-control': 'no-cache'
            };

            return fetch(`/api/users/auth0/${auth0_id}`, {
                method: 'GET',
                headers: headers
            })
                .then(response => {
                    //console.log("getUserByAuth0Id bodyUsed: " + response.bodyUsed);
                    return response.json();
                })
                .then(user => {
                    resolve(user);
                });
        });
    }


}
