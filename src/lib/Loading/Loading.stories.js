import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

import Loading from './Loading';

library.add(faCog);

export default {
    title: 'Loading',
    component: Loading,
};

export const loading = () => <Loading animate loading text="Loading..." />;
