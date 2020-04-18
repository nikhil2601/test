import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _set from 'lodash/set';

import Col from 'lib/Col';
import Row from 'lib/Row';
import Switch from 'lib/Switch';

import { get } from 'utils';
import FormGroupTitle from './FormGroupTitle';

class LegislationStatusField extends Component {
    constructor(props) {
        super(props);

        const { formData, schema } = this.props;
        const id = get(schema, 'title').replace(/ /g, '');
        this.idComponent = `${id.charAt(0).toLowerCase()}${id.slice(1)}`;
        this.state = {
            [this.idComponent]: formData,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { formData } = this.props;
        if (nextProps.formData !== formData) {
            this.setState({
                [this.idComponent]: nextProps.formData,
            });
        }
    }

    handleOnSwitchClick = () => {
        const { formContext } = this.props;
        const updatedFormData = { ...formContext.getFormData() };
        const { idComponent } = this;
        const checked = this.getValueForField(idComponent);
        this.setState({
            [idComponent]: !checked,
        });

        Object.keys(updatedFormData).forEach(function(key) {
            if (typeof updatedFormData[key] === 'object') {
                if ('review' in updatedFormData[key]) {
                    _set(updatedFormData[key], idComponent, !checked);
                    _set(updatedFormData[key], 'review', !checked);
                }
            }
        });

        // Update the form with the newly set data
        formContext.updateFormData({ formData: updatedFormData });
    };

    /**
     * Returns value for the given field name from state object
     *
     * @param   {string}    fieldName    Name of the field for which data needs to be retrieved
     * @return  {date}
     */
    getValueForField = fieldName => {
        return this.state[fieldName] ? this.state[fieldName] : false;
    };

    render() {
        const { idSchema, required, schema } = this.props;
        const id = get(idSchema, '$id', '');
        const title = get(schema, 'title', '');
        const titleHelptext = get(schema, 'helpText', {});

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
                <Col size={12} style={{ position: 'relative' }}>
                    <Switch
                        checked={this.getValueForField(this.idComponent)}
                        onClick={this.handleOnSwitchClick}
                        margin="0"
                    />
                </Col>
            </Row>
        );
    }
}

LegislationStatusField.propTypes = {
    formContext: PropTypes.object,
    formData: PropTypes.bool,
    idSchema: PropTypes.object,
    options: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
};

LegislationStatusField.defaultProps = {
    formContext: null,
    formData: null,
    idSchema: null,
    options: null,
    required: null,
    schema: null,
    uiSchema: null,
};

export default LegislationStatusField;
