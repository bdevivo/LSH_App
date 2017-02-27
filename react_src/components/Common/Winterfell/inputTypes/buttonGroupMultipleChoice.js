import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

let cloneArray = require('../lib/cloneArray');

class ButtonGroupMultipleChoice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value : this.props.value.length > 0
                ? cloneArray(this.props.value)
                : []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let currentValue = this.state.value;

        if (!this.state.value.includes(event.target.value)   ) {
            currentValue.push(event.target.value);  // add the clicked button to the list of values
        } else {
            currentValue = currentValue.filter(v => v != event.target.value); // remove the clicked button from the list of values
        }

        this.setState({
            value : currentValue
        }, this.props.onChange.bind(null, currentValue));
    }


    render() {

        let options = this.props.options.map(opt => {
            return (

                <Button bsStyle="success"
                        key={opt.value}
                        value={opt.value}
                        active={this.state.value.includes(opt.value)}
                        required={this.props.required
                            ? 'required'
                            : undefined}
                        onClick={this.handleChange}>{opt.text}</Button>
            );
        });

        {/*<ButtonGroup bsSize="large">*/}
        return (
            <ButtonGroup>
                {options}
            </ButtonGroup>
        );
    }

}

ButtonGroupMultipleChoice.propTypes = {
    options     : PropTypes.array,
    classes     : PropTypes.object,
    name        : PropTypes.string,
    id          : PropTypes.string,
    labelId     : PropTypes.string,
    value       : PropTypes.array,
    placeholder : PropTypes.string,
    onChange    : PropTypes.func,
    onBlur      : PropTypes.func,
    required    : PropTypes.bool
};

ButtonGroupMultipleChoice.defaultProps = {
    classes  : {},
    name     : undefined,
    value    : [],
    options  : [],
    onChange : () => {},
    onBlur   : () => {}
};

export default ButtonGroupMultipleChoice;