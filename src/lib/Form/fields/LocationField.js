import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Input, Row, Col, Select } from 'lib';
import FormGroupTitle from 'lib/Form/fields/FormGroupTitle';
import DescriptionField from 'lib/Form/fields/DescriptionField';
import { callFunc, getHandler, get } from 'utils';

function LocationField(props) {
    const {
        id,
        disabled,
        formContext: { handlers },
        formData,
        schema,
    } = props;
    // actions
    const onValidateZipcode = getHandler(handlers, 'onValidateZipcode');
    // get the `zipAddresses` data to build the default list of options
    const zipAddressesData = get(schema, 'zipAddresses');
    // build the default options for `city, `county` and `state`
    const cityOptions = buildSelectOptions(zipAddressesData, 'city');
    // build the `county` options
    const countyOptions = buildSelectOptions(zipAddressesData, 'county');
    // build the `state` options
    const stateOptions = buildSelectOptions(zipAddressesData, 'state');
    // update the selected options
    const [selectOptions, setSelectOptions] = useState({
        city: cityOptions,
        county: countyOptions,
        state: stateOptions,
    });
    // initial data component state
    const [initialData, setInitialData] = useState({ ...formData });

    // input ids
    const zipId = `${id}__zip`;

    useEffect(() => {
        setInitialData(formData);
    }, [formData]);

    // fields to set the default values
    const [zip, setZip] = useState(get(initialData, 'zip', ''));
    const zipRef = useRef(null);
    useEffect(() => {
        setZip(get(formData, 'zip', ''));
        zipRef.current.value = get(formData, 'zip', '');
    }, [formData, setZip]);

    function handleSelectOnChange(type) {
        return function(option) {
            const { onChange } = props;
            // get the value
            const value = get(option, 'value', '');
            // Build the updated location.
            const updatedLoc = {
                ...initialData,
                [type]: value,
            };
            // Update the location.
            setInitialData(prevLoc => ({
                ...prevLoc,
                [type]: value,
            }));
            // update the the form
            callFunc(onChange, updatedLoc);
        };
    }

    // handle the onBlur event
    async function _onBlur(e) {
        const { value } = e.target;
        try {
            const { formContext, onChange } = props;
            // validate the zipcode
            const addresses = await onValidateZipcode(value);
            // make the result is an array
            if (Array.isArray(addresses)) {
                // build the `city` options
                const cityOptions = buildSelectOptions(addresses, 'city');
                // build the `county` options
                const countyOptions = buildSelectOptions(addresses, 'county');
                // build the `state` options
                const stateOptions = buildSelectOptions(addresses, 'state');
                // update the selected options
                setSelectOptions({
                    city: cityOptions,
                    county: countyOptions,
                    state: stateOptions,
                });
                // update the fields for the `locationLookup`
                const updatedData = {
                    ...initialData,
                    zip: value,
                    city: addresses[0].city,
                    state: addresses[0].state,
                    county: addresses[0].county,
                };
                setInitialData(updatedData);
                formContext.updateFormData({ formData: updatedData });
                // update the form
                callFunc(onChange, updatedData);
            }
        } catch (err) {
            return [];
        }
    }

    /**
     * Remove duplicate counties when building the county options for the select field
     *
     * @param {Array} arr List of objects
     * @param {Array} key The object key to use to create the options
     * @return {Array} Return Array of objects for the select options
     */
    function buildSelectOptions(arr, key) {
        if (!Array.isArray(arr)) {
            return [];
        }
        // get the list of counties
        const options = arr.map(item => item[key]);
        // filter out the array from duplication, for example state: [CA, CA]
        return options
            .filter((item, index) => {
                return options.indexOf(item) >= index;
            })
            .map(value => ({ label: value, value }));
    }

    /**
     * Returns value for the given field name from initialData object
     *
     * @param   {string}    fieldName    Name of the field for which data needs to be retrieved
     * @return  {Object}
     */
    function getValueForField(fieldName) {
        return initialData[fieldName]
            ? { label: initialData[fieldName], value: initialData[fieldName] }
            : undefined;
    }

    return (
        <>
            <Row width="auto">
                <Col size={12}>
                    <FormGroupTitle id={zipId} title="Zip" required={Boolean(!initialData.zip)} />
                    <Input
                        id={zipId}
                        type="text"
                        defaultValue={zip}
                        disabled={disabled}
                        onBlur={_onBlur}
                        required
                        ref={zipRef}
                    />
                    <DescriptionField
                        id={zipId}
                        description="Please provide a valid 5 digit zip code. A valid zip code will populate City, County and State automatically for the provided zip code."
                    />
                </Col>
            </Row>
            <Row width="auto" margin="10px -8px">
                <Col size={12}>
                    <FormGroupTitle
                        id={`${id}__city`}
                        required={Boolean(!initialData.city)}
                        title="City"
                    />
                    <Select
                        isDisabled={disabled}
                        id={`${id}__city`}
                        options={selectOptions.city}
                        value={getValueForField('city')}
                        onChange={handleSelectOnChange('city')}
                        required
                    />
                </Col>
            </Row>
            <Row width="auto" margin="10px -8px">
                <Col size={6}>
                    <FormGroupTitle
                        id={`${id}__county`}
                        required={Boolean(!initialData.county)}
                        title="County"
                    />
                    <Select
                        isDisabled={disabled}
                        id={`${id}__county`}
                        options={selectOptions.county}
                        value={getValueForField('county')}
                        onChange={handleSelectOnChange('county')}
                        placeholder="--Please choose a county--"
                        required
                    />
                </Col>
                <Col size={6}>
                    <FormGroupTitle
                        id={`${id}__state`}
                        required={Boolean(!initialData.state)}
                        title="State"
                    />
                    <Select
                        isDisabled={disabled}
                        id={`${id}__state`}
                        options={selectOptions.state}
                        value={getValueForField('state')}
                        onChange={handleSelectOnChange('state')}
                        placeholder="--Please choose a state"
                        required
                    />
                </Col>
            </Row>
        </>
    );
}

LocationField.propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool,
    formData: PropTypes.object,
    formContext: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
};

LocationField.defaultProps = {
    id: null,
    disabled: false,
    formData: null,
    formContext: null,
};

export default LocationField;
