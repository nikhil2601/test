import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Row from 'lib/Row';
import Col from 'lib/Col';
import { callFunc } from 'utils';
import SortingButton from 'lib/Sorting/SortingButton';

function Sorting(props) {
    const { options, defaultOptions, onChange } = props;
    const [selectedOption, setSelectedOption] = useState(defaultOptions);
    // Handle the `onChange` for the `AdvanceSearchInput`.
    function handleInputChange(selectedInput) {
        const PreviousSelectedInput = selectedOption;
        setSelectedOption(selectedInput);
        callFunc(onChange, PreviousSelectedInput.order, selectedInput.orderBy);
    }

    return (
        <Row>
            <Col size={12} style={{ maxWidth: '40%', marginLeft: 'auto' }}>
                <Row justify="flex-end" alignItems="center">
                    <Col style={{ zIndex: 1200 }}>
                        <SortingButton
                            handleInputChange={handleInputChange}
                            options={options}
                            selectedOption={selectedOption}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

Sorting.propTypes = {
    options: PropTypes.array,
    defaultOptions: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

Sorting.defaultProps = {
    options: null,
    defaultOptions: null,
};

export default Sorting;
