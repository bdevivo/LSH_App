import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

class ButtonGroupSingleChoice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        }, this.props.onChange.bind(null, event.target.value));
    }

    render() {

        let options = this.props.options.map(opt => {
            return (

                <Button bsStyle="success"
                        key={opt.value}
                        value={opt.value}
                        active={opt.value === this.state.value}
                        required={this.props.required
                            ? 'required'
                            : undefined}
                        onClick={this.handleChange}>{opt.text}</Button>
            );
        });

        return (
            <ButtonGroup>
                {options}
            </ButtonGroup>
        );
    }

}

ButtonGroupSingleChoice.propTypes = {
    classes: PropTypes.object,
    name: PropTypes.string,
    id: PropTypes.string,
    labelId: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool
};

ButtonGroupSingleChoice.defaultProps = {
    classes: {},
    name: undefined,
    value: undefined,
    options: [],
    onChange: () => {
    },
    onBlur: () => {
    }
};
export default ButtonGroupSingleChoice;