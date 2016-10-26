import  Immutable from 'immutable';

export default Immutable.fromJS(
    {
        questions: [],
        isLoggedIn: false,
        profile: {
            user_id: '',
            user_name: {
                first: '',
                middle: '',
                last: ''
            },
            address: {
                street1: '',
                street2: '',
                city: '',
                state: '',
                country: '',
                zip: ''
            },
            avatarUrl: '',
            roles: []

        }
    }
);



