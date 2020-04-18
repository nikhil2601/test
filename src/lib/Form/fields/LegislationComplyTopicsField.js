import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';

import Col from 'lib/Col';
import Row from 'lib/Row';
import Select from 'lib/Select';

import { callFunc, getHandler, get } from 'utils';
import FormGroupTitle from './FormGroupTitle';

class LegislationComplyTopicsField extends Component {
    constructor(props) {
        super(props);

        const { formData, schema } = this.props;
        const id = get(schema, 'title').replace(/ /g, '');
        this.idComponent = `${id.charAt(0).toLowerCase()}${id.slice(1)}`;

        this.state = {
            defaultOptions: {},
            formattedTopics: {},
            formData,
        };
    }

    componentWillMount = () => {
        const { formData, uiSchema } = this.props;
        const options = this._getUiOptions(uiSchema);
        const { hrTopics } = options;
        this.updateState(formData, hrTopics);
    };

    /**
     * Styles for the hidden `input` element
     *
     * @method getHiddenInputStyle
     * @return {Object}
     */

    getHiddenInputStyle = () => ({
        height: 38,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1,
    });

    /**
     * Get the `ui:options` for the current field.
     *
     * @method _getUiOptions
     * @private
     * @param  {Object}      schema The schema to extract the options from
     * @return {Object}             The extracted options
     */
    _getUiOptions = schema => get(schema, 'ui:options', {});

    handleOnChange = options => {
        const newTopics = options.map(function(option) {
            return { value: option.value };
        });

        const formattedTopics = options.map(function(topic) {
            const newTopic = { value: topic.value, label: topic.value };
            return newTopic;
        });
        this.setState({
            formattedTopics,
            formData: newTopics,
        });
    };

    handleOnBlur = evt => {
        const { currentTarget } = evt;
        const { formContext } = this.props;
        const updatedFormData = { ...formContext.getFormData() };
        const { idComponent } = this;
        const { handlers = {} } = formContext;
        const updateTopics = getHandler(handlers, 'updateTopics');
        const topics = this.state.formData;

        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                callFunc(updateTopics, {
                    topics,
                });
            }
        }, 0);

        Object.keys(updatedFormData).forEach(function(key) {
            if (typeof updatedFormData[key] === 'object') {
                if (idComponent in updatedFormData[key]) {
                    _set(updatedFormData[key], idComponent, topics);
                }
            }
        });

        // Update the form with the newly set data
        formContext.updateFormData({ formData: updatedFormData });
    };

    updateState = (formData, hrTopics) => {
        const formattedTopics = formData.map(function(topic) {
            const newTopic = { value: topic.value, label: topic.value };
            return newTopic;
        });

        const defaultOptions = hrTopics.map(function(option) {
            option.label = option.value;
            return option;
        });

        this.setState({
            defaultOptions,
            formattedTopics,
        });
    };

    render() {
        const { defaultOptions, formattedTopics } = this.state;
        const { idSchema, required, schema } = this.props;
        const id = get(idSchema, '$id', '');
        const title = get(schema, 'title', '');
        const titleHelptext = get(schema, 'helpText', {});
        const hiddenInputValue = !_isEmpty(formattedTopics) ? JSON.stringify(formattedTopics) : '';

        return (
            <Row width="auto">
                <Col size={12}>
                    <FormGroupTitle
                        helpText={titleHelptext}
                        id={id}
                        required={required && Boolean(!formattedTopics)}
                        title={title}
                    />
                </Col>
                <Col size={12} style={{ position: 'relative' }}>
                    <Select
                        defaultValue={formattedTopics}
                        isMulti
                        isClearable={false}
                        minControlHeight={30}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange}
                        options={defaultOptions}
                        placeholder=""
                        customMenuPosition="relative"
                    />
                    <input
                        id={id}
                        onChange={() => {}}
                        required={required}
                        style={this.getHiddenInputStyle()}
                        tabIndex={-1}
                        type="text"
                        value={hiddenInputValue}
                    />
                </Col>
            </Row>
        );
    }
}

LegislationComplyTopicsField.propTypes = {
    formContext: PropTypes.object,
    formData: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    idSchema: PropTypes.object,
    options: PropTypes.object,
    required: PropTypes.bool,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
};

LegislationComplyTopicsField.defaultProps = {
    formContext: null,
    formData: null,
    idSchema: null,
    options: null,
    required: null,
    schema: null,
    uiSchema: null,
};

export default LegislationComplyTopicsField;
