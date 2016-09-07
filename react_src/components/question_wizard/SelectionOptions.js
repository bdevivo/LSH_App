import React, { Component, PropTypes } from 'react';

class SelectionOptions extends Component {



    render() {
        let options;
        console.log("Rendering SelectionOption");
        console.log("selectionOptions: " + this.props.selectionOptions);

        if (typeof(this.props.selectionOptions) !== "undefined" && this.props.selectionOptions !== null)
        {
            options = this.props.selectionOptions.map(
                (opt) => <label class="btn btn-success">
                    <input type="radio" id="{opt.ID}">{opt.Text}</input>
                </label>
            );
        }

        return(
            <div>
                <div id="divProjectCategory" class="btn-group btn-group-lg categorySelectButtonGroup" data-toggle="buttons">
                    {options}
                </div>
            </div>
        )
    }
}

SelectionOptions.propTypes = {
    selectionOptions: PropTypes.object,
    AnswerTypeCallbacks: PropTypes.object
};