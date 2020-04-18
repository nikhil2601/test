import React from 'react';
import { actions } from '@storybook/addon-actions';

import { phoneInputMask } from '../../demo/containers/Testing/SelectTesting/inputMasks';

import Input from './Input';
import Select from '../Select';
import InputMask from './InputMask';

export default {
    title: 'Input',
    component: Input,
};

const handlers = actions('onClick', 'onChange');

export const textInput = () => (
    <Input required type="text" {...handlers} defaultValue="Text input" />
);

const options = [
    {
        label: 'option 1',
        value: 'value 1',
    },
    {
        label: 'option 2',
        value: 'value 2',
    },
    {
        label: 'option 3',
        value: 'value 3',
    },
];

export const selectInput = () => <Select value="" options={options} {...handlers} />;

export const maskedInput = () => (
    <InputMask
        mask={phoneInputMask}
        placeholder="Masked Phone input eg:- (111) 111-1111 ext. 11111"
        {...handlers}
    />
);
