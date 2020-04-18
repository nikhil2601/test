import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _format from 'date-fns/format';
import _set from 'lodash/set';

import Col from 'lib/Col';
import Row from 'lib/Row';
import DatePicker from 'lib/DatePicker';

import { callFunc, getHandler, get } from 'utils';
import FormGroupTitle from './FormGroupTitle';

class LegislationDateField extends Component {
    constructor(props) {
        super(props);

        let { formData, schema } = this.props;
        if (formData && formData.indexOf('T') === -1) {
            formData = `${formData}T12:00:00Z`;
        }
        const selectedDate = formData ? new Date(formData) : '';
        const id = get(schema, 'title').replace(/ /g, '');
        this.idComponent = `${id.charAt(0).toLowerCase()}${id.slice(1)}`;
        this.state = {
            [this.idComponent]: selectedDate,
        };
    }

    /**
     * Styles for the hidden `input` element
     *
     * @method getHiddenInputStyle
     * @return {Object}
     */
    getHiddenInputStyle = () => ({
        height: '100%',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: -1,
    });

    handleOnBlur = evt => {
        const { formContext } = this.props;
        const updatedFormData = { ...formContext.getFormData() };
        const { handlers = {} } = formContext;
        const updateDate = getHandler(handlers, 'updateDate');
        const { idComponent } = this;
        const date = this.state[idComponent] ? new Date(this.state[idComponent]) : null;

        if (updateDate) {
            callFunc(updateDate, {
                id: this.idComponent,
                date,
            });
        }

        Object.keys(updatedFormData).forEach(function(key) {
            if (typeof updatedFormData[key] === 'object') {
                if (idComponent in updatedFormData[key]) {
                    const newValue = date ? _format(date, 'YYYY-MM-DD') : null;
                    _set(updatedFormData[key], idComponent, newValue);
                }
            }
        });

        // Update the form with the newly set data
        formContext.updateFormData({ formData: updatedFormData });
    };

    handleOnChange = date => {
        this.setState({
            [this.idComponent]: date,
        });
    };

    handleOnSelect = date => {};

    /**
     * Returns value for the given field name from state object
     *
     * @param   {string}    fieldName    Name of the field for which data needs to be retrieved
     * @return  {date}
     */
    getValueForField = fieldName => {
        return this.state[fieldName] ? this.state[fieldName] : '';
    };

    render() {
        const { idSchema, required, schema } = this.props;
        const id = get(idSchema, '$id', '');
        const title = get(schema, 'title', '');
        const titleHelptext = get(schema, 'helpText', {});
        const disabled = get(schema, 'disabled', false);

        return (
            <Row width="auto">
                <Col size={12}>
                    <FormGroupTitle
                        helpText={titleHelptext}
                        id={id}
                        required={required && Boolean(!this.getValueForField(this.idComponent))}
                        title={title}
                    />
                </Col>
                <Col className="customDatePickerInput" size={12} style={{ position: 'relative' }}>
                    <DatePicker
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange}
                        onSelect={this.handleOnSelect}
                        selected={this.getValueForField(this.idComponent)}
                        className="customDatePickerWidth"
                        disabled={disabled}
                    />
                    <input
                        id={id}
                        onChange={() => {}}
                        required={required}
                        style={this.getHiddenInputStyle()}
                        tabIndex={-1}
                        type="text"
                        value={this.getValueForField(this.idComponent)}
                    />
                </Col>
            </Row>
        );
    }
}

LegislationDateField.propTypes = {
    formContext: PropTypes.object,
    formData: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    idSchema: PropTypes.object,
    options: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
};

LegislationDateField.defaultProps = {
    formContext: null,
    formData: null,
    idSchema: null,
    options: null,
    required: null,
    schema: null,
    uiSchema: null,
};

export default LegislationDateField;
