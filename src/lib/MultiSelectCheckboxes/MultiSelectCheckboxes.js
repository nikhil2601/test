import React from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

function MultiSelectCheckboxes(props) {
    const { ...rest } = props;

    return <ReactMultiSelectCheckboxes {...rest} />;
}

export default MultiSelectCheckboxes;
