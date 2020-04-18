import _isEqual from 'lodash/isEqual';

/**
 * For form dirty check operations
 *
 * RJSF (react-jsonschema-form) by default do not provide a functionality to identify
 * whether the form is dirty/pristine.
 * So, this class will be the utility for RJSF wrapper <Form>.
 *
 * Additionally,
 * we need to handle a flag 'isDataInitialized' as the RJSF's form automatically
 * triggers a onChange callback initially. To not consider that as a dirty(change) operation,
 * we considered it a data initialization callback. And then further onChange calls
 * will decide the form's dirty state by comparing the initial and current form data.
 *
 * @type {class}
 */
class FormDirtyCheck {
    /**
     * Is data initialized
     *
     * @type {boolean}
     */
    isDataInitialized = false;
    /**
     * Is form dirty (changed)
     *
     * @type {boolean}
     */
    isDirty = false;
    /**
     * Initial form data defined after data initialization
     *
     * @type {*}
     */
    initialFormData = {};
    /**
     * Current form data
     *
     * @type {*}
     */
    formData = {};

    /**
     * Checks whether the initialFormData and formData are not equal
     *
     * @return {boolean}
     */
    isFormDataChanged = () => _isEqual(this.formData, this.initialFormData);

    /**
     * Calls when formData change
     *
     * @param   {Object}        form object
     */
    onChange = ({ formData }) => {
        this.formData = formData;

        if (this.isDataInitialized) {
            this.isDirty = !this.isFormDataChanged();
        } else {
            this.initialFormData = formData;
            this.isDataInitialized = true;
        }
    };

    /**
     * Initial form data setter
     *
     * @param   {Object}    formData
     */
    setInitialFormData = formData => {
        this.initialFormData = formData;
    };

    /**
     * Form data setter
     *
     * @param   {Object}    formData
     */
    setFormData = formData => {
        this.formData = formData;
    };

    /**
     * Check whether the form is dirty
     *
     * @return {boolean}
     */
    isFormDirty = () => this.isDirty;
}

export default FormDirtyCheck;
