import React from 'react';

import MultiSelectCheckboxes from './MultiSelectCheckboxes';

export default {
    title: 'MultiSelectCheckboxes',
    component: MultiSelectCheckboxes,
};

export const simple = () => <MultiSelectCheckboxes />;

const options = [
    { label: 'Thing 1', value: 1 },
    { label: 'Thing 2', value: 2 },
];
export const withOptions = () => <MultiSelectCheckboxes options={options} />;
