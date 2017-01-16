import React, {PropTypes} from 'react';

class CheckboxInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: props.defaultChecked
        };
    }

    componentDidMount() {
        if (this.state.checked) {
            this.handleChange();
        }
    }

    handleChange(e) {
        if (e) {
            this.setState({
                'checked': !this.state.checked
            }, () => {
                this.props.onChange(this.state.checked
                    ? this.props.value
                    : undefined);
            });
        } else {
            this.props.onChange(this.state.checked
                ? this.props.value
                : undefined);
        }
    }

    render() {
        return (
            <div className={this.props.classes.checkboxInput}>
                <label className={this.props.classes.checkboxLabel}
                       id={this.props.labelId}>
                    <input type="checkbox"
                           name={this.props.name}
                           //aria-labelledby={this.props.labelId}
                           className={this.props.classes.checkbox}
                           defaultChecked={this.state.checked}
                           value={this.props.value}
                           required={this.props.required
                               ? 'required'
                               : undefined}
                           onChange={this.handleChange.bind(this)}
                           onBlur={this.props.onBlur.bind(null, (this.state.checked
                               ? this.props.value
                               : undefined))}/>
                    {this.props.text}
                </label>
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
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool
};

CheckboxInput.defaultProps = {
    text: '',
    defaultChecked: false,
    classes: {},
    name: undefined,
    value: undefined,
    onChange: () => {
    },
    onBlur: () => {
    }
};

module.exports = CheckboxInput;
