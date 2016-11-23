export default class UserApi {


    static addUser(profile) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            let user_data = {
                user_id: profile.user_id
                // add the rest here
            };

            const body = JSON.stringify(user_data);

            return fetch('/api/users', {
                method: 'POST',
                headers: headers,
                body: body
                })
                .then(response => response.json())
                .then(user => resolve(user));
                //.then ();
                //err => console.log("Error adding user: " + err));
        });
    }


}
