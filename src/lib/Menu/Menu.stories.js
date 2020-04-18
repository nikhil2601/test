import React from 'react';

import Menu from './Menu';
import MenuItem from '../MenuItem';
import MenuLink from '../MenuLink';

export default {
    title: 'Menu',
    component: Menu,
};

export const simple = () => <Menu>Menu Content</Menu>;

export const menuItems = () => (
    <Menu margin={2} placement="bottom-end">
        <MenuItem>
            <MenuLink>first</MenuLink>
        </MenuItem>
        <MenuItem>
            <MenuLink>second</MenuLink>
        </MenuItem>
        <MenuItem>
            <MenuLink>third</MenuLink>
        </MenuItem>
    </Menu>
);
