import React from 'react';

import Link from './Link';

export default {
    title: 'Link',
    component: Link,
};

export const link = () => <Link color="blue">Link</Link>;

export const linkTitle = () => (
    <Link color="blue" type="title">
        Link
    </Link>
);

export const linkSubheading = () => (
    <Link color="blue" type="subheading">
        Link
    </Link>
);
