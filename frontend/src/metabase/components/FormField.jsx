import React, { Component, PropTypes } from "react";

import cx from "classnames";

export default class FormField extends Component {
    static propTypes = {
        // redux-form compatible:
        error: PropTypes.object,
        name: PropTypes.string,

        displayName: PropTypes.string.isRequired,

        // legacy
        fieldName: PropTypes.string,
        errors: PropTypes.object
    };

    getError() {
        if (this.props.error) {
            return this.props.error;
        }

        // legacy
        if (this.props.errors &&
            this.props.errors.data.errors &&
            this.props.fieldName in this.props.errors.data.errors) {
            return this.props.errors.data.errors[this.props.fieldName];
        }
    }

    render() {
        let fieldErrorMessage;
        let fieldError = this.getError();
        if (fieldError) {
            fieldErrorMessage = (
                <span className="text-error mx1">{fieldError}</span>
            );
        }

        return (
            <div className={cx("Form-field", { "Form--fieldError": fieldError })}>
                <label className="Form-label" htmlFor={this.props.name}>{this.props.displayName} {fieldErrorMessage}</label>
                {this.props.children}
            </div>
        );
    }
}
