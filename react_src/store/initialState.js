//import  Immutable from 'immutable';

export default
{
   questions: [],
   auth: {
      isLoggedIn: false
   },
   profile: {
      user_id: '',
      auth0_id: '',
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
      employment: [],
      skills: [],
      avatarUrl: '',
      roles: []
   },
   ui: {
      profile_section: 'account',
      profile_section_name: 'Account',
   },
   ajaxCallsInProgress: 0
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




