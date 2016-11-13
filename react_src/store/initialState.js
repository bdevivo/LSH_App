//import  Immutable from 'immutable';

export default
{
    questions: [],
    auth: {
        isLoggedIn: false
    },
    profile: {
        user_id: '',
        email: '',
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
        education: [],
        avatarUrl: '',
        roles: []
    },
    ui: {
        in_profile_edit_mode: false,
        profile_section: 'account',
        profile_section_name: 'Account'
    }
};


// NOT EXPORTED -- JUST HERE FOR REFERENCE

const educationFormat = {
        id: 0,
        school: '',
        fromYear: '',
        toYear: '',
        degree: '',
        fieldsOfStudy: '',
        description: '',
        gpa: ''
    };




