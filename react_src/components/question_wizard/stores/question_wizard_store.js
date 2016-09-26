'use strict';

import { EventEmitter } from 'events';
import dispatcher from '../../../dispatcher';
import { TOGGLE_QUESTION } from '../actions/toggle_question';

let CHANGE_EVENT = 'change';

class question_wizard_store extends EventEmitter {
    constructor() {
        super();

        this.state = [
            {
                id: 1,
                name: 'Question 1',
                visible: true

            },
            {
                id: 2,
                name: 'Question 2',
                visible: false
            }
        ];

        dispatcher.register((e) => {

            switch (e.type) {

                case TOGGLE_QUESTION:
                {
                    // payload is Question ID
                    let question = this.state.find(q => q.id === e.payload);
                    if (question)
                    {
                        question.visible = !question.visible;
                        this.emit('change', this.state);
                    }
                }

                break;

               // case ADD_QUESTION:

                default:

                   // console.log("type not recognized: " + e.type);


            }
        });
    }

    addChangeListener(callback)  {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

}

export default new question_wizard_store();
