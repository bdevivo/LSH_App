import React, {PropTypes} from 'react';
import {Checkbox} from 'react-bootstrap';

class CheckboxInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: typeof props.value === 'undefined' ? props.defaultChecked : props.value
        };
    }

    componentDidMount() {
        // if (this.state.checked) {
        //     this.handleChange();
        // }

        let label = $("label#" + this.props.name + "-label"); // this is the label
        let checkbox = $("input[type='checkbox']#" + this.props.name);
        checkbox.addClass("formCheckbox");
        label.prepend(checkbox);

    }

    handleChange(e) {
        if (e) {
            this.setState({
                'checked': !this.state.checked
            }, () => {
                this.props.onChange(this.state.checked);
            });
        } else {
            this.props.onChange(!this.state.checked);
        }
    }

    render() {
        return (
            <div className={this.props.classes.checkboxInput}>

                    <Checkbox
                            id={this.props.name}
                           name={this.props.name}
                           checked={this.state.checked}
                           className={this.props.classes.checkbox}
                           //defaultChecked={this.state.checked}
                           value={this.props.value}
                           required={this.props.required
                               ? 'required'
                               : undefined}
                           onChange={this.handleChange.bind(this)}
                           onBlur={this.props.onBlur.bind(null, (this.state.checked
                               ? this.props.value
                               : undefined))}>
                        {this.props.text}
                    </Checkbox>

            </div>
        );
    }

}

CheckboxInput.propTypes = {
    text: PropTypes.string,
    defaultChecked:PropTypes.bool,
    classes: PropTypes.object,
    name: PropTypes.string,
    labelId: PropTypes.string,
    value: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool
};

CheckboxInput.defaultProps = {
    text: '',
    defaultChecked: undefined,
    classes: {},
    name: undefined,
    value: false,
    onChange: () => {
    },
    onBlur: () => {
    }
};

module.exports = CheckboxInput;
