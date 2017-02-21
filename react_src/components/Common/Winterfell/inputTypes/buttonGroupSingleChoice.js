import React, {PropTypes} from 'react';

class ButtonGroupSingleChoice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value : this.props.value
        };
    }

    handleChange(value) {
        this.setState({
            value : value
        }, this.props.onChange.bind(null, value));
    }

    render() {

        let options = this.props.options.map(opt => {
            return (

                <li key={opt.value}
                    className={this.props.classes.radioListItem}>
                    <label className="btn btn-success"
                           id={this.props.labelId}>
                        <input type="radio"
                               name={this.props.name}
                            // aria-labelledby={this.props.labelId}
                               checked={this.state.value == opt.value}
                               className={this.props.classes.radio}
                               required={this.props.required
                                   ? 'required'
                                   : undefined}
                               onChange={this.handleChange.bind(this, opt.value)}
                               onBlur={this.props.onBlur.bind(null, this.state.value)} />
                        {opt.text}
                    </label>
                </li>
            );
        });

        return (
            <div id="divProjectCategory" className="btn-group btn-group-lg categorySelectButtonGroup" data-toggle="buttons">
                {options}
            </div>
        );
    }

}

ButtonGroupSingleChoice.propTypes = {
    classes     : PropTypes.object,
    name        : PropTypes.string,
    id          : PropTypes.string,
    labelId     : PropTypes.string,
    options     : PropTypes.array,
    value       : PropTypes.string,
    placeholder : PropTypes.string,
    onChange    : PropTypes.func,
    onBlur      : PropTypes.func,
    required    : PropTypes.bool
};

ButtonGroupSingleChoice.defaultProps = {
    classes  : {},
    name     : undefined,
    value    : undefined,
    options  : [],
    onChange : () => {},
    onBlur   : () => {}
};

module.exports = ButtonGroupSingleChoice;