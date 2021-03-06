import React from 'react';

import SvgIcon, {
    AlertIcon,
    ArrowIcon,
    CheckboxEmptyIcon,
    CheckboxIcon,
    CheckboxIndeterminateIcon,
    ChevronIcon,
    ClearIcon,
    EmailIcon,
    EyeIcon,
    GearIcon,
    KeyIcon,
    MenuIcon,
    PhoneIcon,
    SearchIcon,
    GridIcon,
    TrashIcon,
} from './index';

export default {
    title: 'SvgIcon',
    component: SvgIcon,
};

export const alertSvgIcon = () => <AlertIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const arrowSvgIcon = () => <ArrowIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const checkboxEmptySvgIcon = () => (
    <CheckboxEmptyIcon viewBox="0 0 20 25" height="55px" width="55px" />
);

export const checkboxSvgIcon = () => (
    <CheckboxIcon viewBox="0 0 20 25" height="55px" width="55px" />
);

export const checkboxIndeterminateSvgIcon = () => (
    <CheckboxIndeterminateIcon viewBox="0 0 20 25" height="55px" width="55px" />
);

export const chevronSvgIcon = () => <ChevronIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const clearSvgIcon = () => <ClearIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const emailSvgIcon = () => <EmailIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const eyeSvgIcon = () => <EyeIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const gearSvgIcon = () => <GearIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const keySvgIcon = () => <KeyIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const menuSvgIcon = () => <MenuIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const phoneSvgIcon = () => <PhoneIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const searchSvgIcon = () => <SearchIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const gridSvgIcon = () => <GridIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const trashSvgIcon = () => <TrashIcon viewBox="0 0 20 25" height="55px" width="55px" />;

export const opacitySvgIcon = () => (
    <TrashIcon opacity="0.5" viewBox="0 0 20 25" height="55px" width="55px" />
);

export const customSvgIcon = () => (
    <SvgIcon viewBox="0 0 20 25" height="55px" width="55px">
        <path d="M7.352 14.646c4.526 4.527 9.6 5.757 10.465 5.34l2.216-2.546a.086.086 0 0 0-.002-.008l-3.19-2.526-.857 1.29a1.632 1.632 0 0 1-1.258.67c-.475.024-1.916.1-5.804-3.79-.962-.962-3.889-3.889-3.788-5.803a1.635 1.635 0 0 1 .669-1.26l1.29-.858-2.526-3.189a.318.318 0 0 0-.009-.003L2.013 4.18c-.416.866.813 5.94 5.34 10.467M.613 2.808a.972.972 0 0 1 .05-.046L3.29.474A1.798 1.798 0 0 1 4.697.008c.477.041.938.253 1.265.58.026.027.051.055.074.085L8.617 3.93a1.853 1.853 0 0 1-.046 2.567.99.99 0 0 1-.15.123l-1.32.878c.105.458.794 1.785 3.203 4.195 2.41 2.41 3.737 3.099 4.195 3.204l.877-1.32a.966.966 0 0 1 .123-.15 1.851 1.851 0 0 1 2.567-.046l3.257 2.58c.03.024.058.05.085.076.744.746.792 1.959.113 2.671l-2.286 2.628a.883.883 0 0 1-.046.05c-.452.451-1.13.614-1.872.614-1.34 0-2.89-.531-3.696-.848C12.064 20.54 9 19.06 5.97 16.03 3.724 13.783 1.905 11.065.848 8.376.355 7.124-.653 4.076.614 2.808" />
    </SvgIcon>
);
