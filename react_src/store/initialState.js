//import  Immutable from 'immutable';

export default
{
    questions: [],
    questionPanels: [],
    questionSets: [],
    // questionGrids: {
    //     question_grid_job_posting: {
    //         questionAnswers:{}
    //     },
    //     question_grid_user_profile: {
    //         questionAnswers:{}
    //     }
    // },
    jobPosts: [],
    // draftJobPosting: {
    //     jobId: undefined,
    //     questionAnswers:{}
    // },
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
            last: '',
            short: ''
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
        admin_active_panel_id: '0',
        admin_active_qSet_id: '0',
        question_grid_job_posting: {
            panelHistory: [],
            currentPanelId: '0'
        }
    },
    loadedData: {
        questions: false,
        questionPanels: false,
        questionSets: false,
        userJobs: false
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




