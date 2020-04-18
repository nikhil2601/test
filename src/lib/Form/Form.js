/* eslint-disable react/no-did-update-set-state */
import JsonSchemaForm from 'react-jsonschema-form';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import styled from 'styled-components';

import Loading from 'lib/Loading';
import { extractAPIConfig, fetchAPIData } from 'utils/apis';
import { getThemeProps } from 'utils/theme';
import { warning } from 'utils/warning';

import FormActions from './FormActions';
import FormDirtyCheck from './FormDirtyCheck';
import customFields from './fields';
import customWidgets from './widgets';

const FormStyled = styled.div`
    position: relative;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Form.styles')};
`;

class Form extends Component {
    static propTypes = {
        /**
         * A list of action buttons for the form
         */
        actionsList: PropTypes.arrayOf(
            PropTypes.shape({
                children: PropTypes.node,
                color: PropTypes.string,
                description: PropTypes.node,
                descriptionPosition: PropTypes.oneOf(['top', 'bottom']),
                onClick: PropTypes.func,
                title: PropTypes.node,
                type: PropTypes.string,
            })
        ),
        /**
         * A title for the form actions group
         */
        actionsTitle: PropTypes.string,
        /**
         * Callback fired after the form is submitted.
         *
         * @param {object} resp The api response
         */
        afterSubmit: PropTypes.func,
        /**
         * A list of api configs to call
         */
        apis: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        /**
         * A base URL for making the RESTful API calls.
         */
        baseUrl: PropTypes.string,
        /**
         * The contents of the Form.
         */
        children: PropTypes.node,
        /**
         * To enable form dirty check operation.
         * If set to 'true', the 'isDirty' flag will be passed in onChange callback params.
         */
        enableDirtyCheck: PropTypes.bool,
        /**
         * Handle form submission through an external source.
         */
        externalSubmission: PropTypes.bool,
        /**
         * A set of custom fields for the form.
         */
        fields: PropTypes.object,
        /**
         * The `formContext` which gets passed
         * down to react-jsonschema-form.
         */
        formContext: PropTypes.object,
        /**
         * Initial `formData`
         */
        formData: PropTypes.object,
        /**
         * A map of action handlers used by rendered components.
         */
        handlers: PropTypes.object,
        /**
         * If you would like to hide the default form actions.
         */
        hideActions: PropTypes.bool,
        /**
         * A boolean to show the internal `loading` component.
         */
        loading: PropTypes.bool,
        /**
         * The text to be displayed for the internal `loading` component.
         */
        loadingText: PropTypes.string,
        /**
         * An oAuth token to make API calls.
         */
        oAuthToken: PropTypes.string,
        /**
         * Callback fired when a value changes in the form.
         *
         * @param {Object} form  The form object
         */
        onChange: PropTypes.func,
        /**
         * Callback fired when the form validates and has errors present.
         *
         * @param {Object} errors The form errors
         */
        onError: PropTypes.func,
        /**
         * Callback fired when the form is ready to be submitted.
         *
         * @param {Object} formData The current formData
         */
        onSubmit: PropTypes.func,
        /**
         * If `true`, the form will be marked as read-only.
         */
        readonly: PropTypes.func,
        /**
         * The `schema` for info providing what should the Form render.
         */
        schema: PropTypes.object.isRequired,
        /**
         * Transform the data coming into the form via the API call.
         *
         * @param   {Object} formData The current `formData`
         * @returns {Object}          The transformed `formData`
         */
        transformDataIn: PropTypes.func,
        /**
         * Transform the data going out of the form via the `onSubmit` handler.
         *
         * @returns {Object}  The transformed `formData`
         */
        transformDataOut: PropTypes.func,
        /**
         * The `uiSchema` for determining how the Form should be rendered.
         */
        uiSchema: PropTypes.object,
        /**
         * A set of custom widgets for the form.
         */
        widgets: PropTypes.object,
    };

    static defaultProps = {
        actionsList: [
            {
                children: 'Submit',
                color: 'error',
                onClick: () => {},
            },
        ],
        actionsTitle: '',
        afterSubmit: null,
        apis: {},
        baseUrl: null,
        children: null,
        enableDirtyCheck: false,
        externalSubmission: false,
        fields: null,
        formContext: {},
        formData: {},
        handlers: null,
        hideActions: false,
        loading: null,
        loadingText: null,
        oAuthToken: null,
        onChange: null,
        onError: null,
        onSubmit: null,
        readonly: null,
        transformDataIn: null,
        transformDataOut: null,
        uiSchema: {},
        widgets: null,
    };

    constructor(props) {
        super(props);
        // Extract the `formData`, incase we need to transform it.
        const { formData, loading, loadingText } = props;
        // Transform the incoming data.
        const data = this.transformData(formData, 'in');
        // Set the state with the updated data.
        this.state = {
            formData: data,
            submittingForm: loading != null ? loading : false,
            submittingFormText: loadingText,
        };

        this.formDirtyCheck = new FormDirtyCheck();
    }

    componentDidUpdate(prevProps, prevState) {
        const { formData: prevFormData } = prevProps;
        const { formData } = this.props;

        if (!_isEqual(formData, prevFormData)) {
            this.setState(() => ({ formData: this.transformData(formData, 'in') }));
        }
    }

    /**
     * Return an updated form context
     *
     * @method getFormContext
     * @return {Object}       The updated formContext
     */
    getFormContext = () => {
        const { handlers, formContext } = this.props;

        return {
            ...formContext,
            getFormData: this.getFormData,
            handlers,
            updateFormData: this.updateFormData,
        };
    };

    /**
     * Get the current formData
     *
     * @method getFormData
     * @return {Object}    The current formData
     */
    getFormData = () => {
        const { formData } = this.state;
        return formData;
    };

    /**
     * Get the current form schema
     *
     * @method getFormSchema
     * @return {Object}
     */
    getFormSchema = () => {
        const { schema } = this.props;
        return schema;
    };

    /**
     * Get the current form uiSchema
     *
     * @method getFormUiSchema
     * @return {Object}
     */
    getFormUiSchema = () => {
        const { readonly, uiSchema } = this.props;
        const { formData } = this.state;

        if (typeof readonly === 'function' && readonly(formData)) {
            return {
                ...uiSchema,
                'ui:readonly': true,
            };
        }

        return uiSchema;
    };

    handleOnChange = form => {
        const { enableDirtyCheck, onChange } = this.props;
        const outputForm = { ...form };

        // Performing the dirty only if the enableDirtyCheck flag is true for performance.
        if (enableDirtyCheck) {
            this.formDirtyCheck.onChange(form);
            // Adding isDirty flag in the
            outputForm.isDirty = this.formDirtyCheck.isFormDirty();
        }

        if (typeof onChange === 'function') {
            onChange(outputForm);
        }
    };

    handleOnError = errors => {
        const { onError } = this.props;
        // Invoke the `onError` if available.
        typeof onError === 'function' && onError(errors);
    };

    /**
     * Handle the form submission internally, transforming the data if needed.
     *
     * @method handleSubmit
     * @param  {Object}     formProps The Form's onSubmit props
     */
    handleSubmit = formProps => {
        const { formData } = formProps;
        const { afterSubmit, apis, baseUrl, oAuthToken, onSubmit } = this.props;
        // Transform the data based on the 'out' func.
        const transformedData = this.transformData(formData, 'out');
        // If `onSubmit` exists then invoke it.
        if (typeof onSubmit === 'function') {
            onSubmit({ ...formProps, formData: transformedData });
        }
        // Check to see if we have a list of `apis`
        // and the `transformedData` is not empty.
        if (!_isEmpty(transformedData) && !_isEmpty(apis)) {
            // Display a warning to user if the `oAuthToken` is empty.
            warning(!_isEmpty(oAuthToken), [
                `A <Form /> requires an oAuthToken to submit the requested data.`,
            ]);
            // Set the `loading` to true.
            this.setState(() => ({ submittingForm: true, submittingFormText: 'Submitting...' }));
            // Extract the API config from the schema.
            const api = extractAPIConfig(apis, 'onSubmit');
            // Extract the requeset object from API config.
            const request = _get(api, 'request', {});
            // Extract the requested `dataKey` for the final fetched data.
            const dataKey = _get(api, 'dataKey', 'data');
            // Build the axios config
            const config = {
                ...request,
                baseURL: baseUrl || request.baseURL,
                data: transformedData,
                headers: {
                    Authorization: `Bearer ${oAuthToken}`,
                },
            };
            // Check to see if the `oAuthToken` is not empty
            // before we start to make the API call.
            if (!_isEmpty(oAuthToken) && !_isEmpty(config.baseURL)) {
                // Make the API call.
                fetchAPIData(config, { data: dataKey })
                    .then(resp => {
                        setTimeout(() => {
                            this.setState(() => ({
                                submittingForm: false,
                                submittingFormText: 'Submitted!',
                            }));
                        });
                        // Extract the data from the response.
                        const data = _get(resp, 'data');
                        // If `afterSubmit` exists then invoke it.
                        if (typeof afterSubmit === 'function') {
                            afterSubmit({ ...formProps, formData: transformedData, resp: data });
                        }
                    })
                    .catch(error => {
                        setTimeout(() => {
                            this.setState(() => ({
                                submittingForm: false,
                                submittingFormText: 'Error submitting form!',
                            }));
                        });
                        // If `afterSubmit` exists then invoke it.
                        if (typeof afterSubmit === 'function') {
                            afterSubmit({ ...formProps, formData: transformedData, error });
                        }
                    });
            } else {
                setTimeout(() => {
                    this.setState(() => ({
                        submittingForm: false,
                        submittingFormText: 'Submitted!',
                    }));
                }, 1000);
            }
        }
    };

    /**
     * Transform the `formData` if needed
     *
     * @method transformData
     * @param  {Object}      formData The current `formData`
     * @param  {string}      inOut    Transform 'in' or 'out'?
     * @return {Object}               The transformed `formData`
     */
    transformData = (formData, inOut) => {
        const { transformDataIn, transformDataOut } = this.props;
        // Switch based on `inOut` key
        switch (inOut) {
            case 'in': {
                const data =
                    typeof transformDataIn === 'function' ? transformDataIn(formData) : formData;
                return data;
            }
            case 'out': {
                const data =
                    typeof transformDataOut === 'function' ? transformDataOut(formData) : formData;
                return data;
            }
            default: {
                return formData;
            }
        }
    };

    /**
     * Update the formData with the passed in values
     *
     * @method updateFormData
     * @param  {Object}       formData The passed in (updated) formData
     */
    updateFormData = ({ formData }) => {
        !_isEmpty(formData) &&
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    ...formData,
                },
            }));
    };

    /**
     * Render the current form's children
     *
     * @method renderChildren
     * @return {node|null}
     */
    renderChildren = () => {
        const {
            actionsList,
            actionsTitle,
            children,
            externalSubmission,
            hideActions,
            readonly,
        } = this.props;
        const { formData } = this.state;

        const disabled = Boolean(typeof readonly === 'function' && readonly(formData));

        if (externalSubmission) {
            return (
                <button
                    ref={btn => (this.submitButton = btn)}
                    style={{ display: 'none' }}
                    type="submit"
                />
            );
        }

        if (_isEmpty(children)) {
            return (
                <FormActions
                    actions={actionsList}
                    disabled={disabled}
                    hideActions={hideActions}
                    title={actionsTitle}
                />
            );
        }

        return children;
    };

    render() {
        const { formData, submittingForm, submittingFormText } = this.state;
        const {
            children,
            fields,
            loading,
            loadingText,
            onSubmit,
            schema,
            uiSchema,
            widgets,
            ...otherProps
        } = this.props;

        const loadingProps = {
            loading: loading != null ? loading : submittingForm,
            text: loadingText != null && loadingText ? loadingText : submittingFormText,
        };

        return (
            <FormStyled>
                <Loading {...loadingProps} />
                <JsonSchemaForm
                    {...otherProps}
                    ArrayFieldTemplate={customFields.ArrayFieldTemplate}
                    FieldTemplate={customFields.FieldTemplate}
                    ObjectFieldTemplate={customFields.ObjectFieldTemplate}
                    fields={{ ...customFields, ...fields }}
                    formContext={this.getFormContext()}
                    formData={formData}
                    onChange={this.handleOnChange}
                    onError={this.handleOnError}
                    onSubmit={this.handleSubmit}
                    schema={this.getFormSchema()}
                    uiSchema={this.getFormUiSchema()}
                    widgets={{ ...customWidgets, ...widgets }}
                >
                    {this.renderChildren()}
                </JsonSchemaForm>
            </FormStyled>
        );
    }
}

export default Form;
