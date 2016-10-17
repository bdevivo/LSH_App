import React, { Component, PropTypes } from 'react';

class SelectionOptions extends Component {



    render() {
        let options;

        if (typeof(this.props.selectionOptions) !== "undefined" && this.props.selectionOptions !== null)
        {
            options = this.props.selectionOptions.map(
                (opt) => <label className="btn btn-success" key="{opt.ID}">
                    <input type="radio" id="{opt.ID}">{opt}</input>
                </label>
            );
        }

        return(
            <div>
                <div id="divProjectCategory" className="btn-group btn-group-lg categorySelectButtonGroup" data-toggle="buttons">
                    {options}
                </div>
            </div>
        );
    }
}

SelectionOptions.propTypes = {
    selectionOptions: PropTypes.object,
    AnswerTypeCallbacks: PropTypes.object
};