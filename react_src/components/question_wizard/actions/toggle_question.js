import dispatcher from '../../../dispatcher';

// action identifier...
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION ';

function toggle_question(question_id)
{
    dispatcher.dispatch({
        type: TOGGLE_QUESTION,
        payload: question_id
    });
}

export default toggle_question;