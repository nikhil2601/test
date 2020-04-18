import React from 'react';

import {
    faArrowAltCircleLeft,
    faCoffee,
    faRocket,
    faBook,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

import FaIcon from './FaIcon';
import notes from './FaIcon.notes.md';

export default {
    title: 'FaIcon',
    component: FaIcon,
    parameters: {
        notes,
    },
};

export const faArrowAltCircleLeftIcon = () => (
    <FaIcon icon={faArrowAltCircleLeft} color="#555" height="30px" width="30px" />
);

export const faBookIcon = () => (
    <FaIcon icon={faBook} color="#900" height="30px" width="30px" padding="50px" />
);

export const faCheckIcon = () => (
    <FaIcon icon={faCheck} color="#060" height="30px" width="30px" margin="20px 0 40px" />
);

export const faCoffeeIcon = () => (
    <FaIcon icon={faCoffee} color="#6f4e37" height="100px" width="40px" />
);

export const faRocketIcon = () => (
    <FaIcon icon={faRocket} color="#999" height="50px" width="50px" opacity="0.3" />
);
