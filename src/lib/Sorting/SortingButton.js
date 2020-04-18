import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';

import FaIcon from 'lib/FaIcon';
import Select from 'lib/Select';
import Box from 'lib/Box';
import Menu from 'lib/Menu';
import { genID } from 'utils/generate';

import SortingMenuItem from './SortingMenuItem';

const SortingDropDownStyled = styled(Select)`
    ${({ theme }) => theme.media.down('lg')`
        display: none
    `}
`;

const SortingMenuMobile = styled(Menu)`
    ${({ theme }) => theme.media.up('lg')`
        display: none
    `}
`;

const SearchInputButton = styled.button`
    ${({ theme }) => theme.media.up('lg')`
    display: none
    `}
    float: right;
    background: #ffffff;
    border: 1px solid #dde1ef;
    color: #7f8fa4;
    line-height: 1;
    outline: 0;
    padding: 8px 10px;
    position: relative;
    text-decoration: none;
    &:hover {
        color: #98a6b2;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
    /**
     * Add styles for disabled and read-only
     */
    &[disabled],
    &[readonly] {
        background-color: #e1e5e9 !important;
        border-color: transparent;
        box-shadow: none;
        cursor: not-allowed;
        user-select: none;
        &:hover {
            color: #c4ccd3;
            cursor: not-allowed;
        }
    }
`;

function SortingButton({ handleInputChange, options, selectedOption }) {
    const dropdownIconRef = React.useRef(null);
    const [onOpenMenu, setonOpenMenu] = React.useState(null);
    const menuEl = React.useRef(null);

    const dropDownProps = {
        options,
        name: 'Sorting',
        isClearable: false,
        isSearchable: false,
        value: selectedOption,
        defaultValue: selectedOption,
        style: { color: '#848484' },
        onChange: handleInputChange,
    };

    const ContentProps = {
        elevation: 10,
        margin: '5px 0 0',
        padding: '0',
    };

    const buttonProps = {
        onClick: handleMenuOpen,
    };

    function handleMenuOpen() {
        const isOpen = !onOpenMenu;
        setonOpenMenu(isOpen);
    }

    return (
        <>
            {/*Sorting Dropdown for desktop view*/}
            <SortingDropDownStyled {...dropDownProps} />
            {/*Sorting Dropdown for mobile view*/}
            <SortingMenuMobile
                ButtonComponent={
                    <SearchInputButton ref={dropdownIconRef} margin="0 -2px 0 0">
                        <FaIcon icon={faFilter} height="17px" width="17px" margin="2px 0 0" />
                    </SearchInputButton>
                }
                ButtonProps={buttonProps}
                ContentComponent={Box}
                ContentProps={ContentProps}
                IconComponent={null}
                open={onOpenMenu}
                placement="bottom-end"
                ref={menuEl}
                timeout={100}
            >
                {options.map((item, itemIdx) => (
                    <SortingMenuItem
                        key={genID('sorting_option')}
                        item={item}
                        onClickMenuItem={handleInputChange}
                        hideDivider={itemIdx === options.length - 1}
                        selected={isEqual(item, selectedOption)}
                    />
                ))}
            </SortingMenuMobile>
        </>
    );
}

SortingButton.propTypes = {
    /**
     * Call back to handle input change
     */
    handleInputChange: PropTypes.func.isRequired,
    /**
     * Sorting options
     */
    options: PropTypes.array,
    /**
     * Selected sorting options
     */
    selectedOption: PropTypes.any,
};

SortingButton.defaultProps = {
    options: null,
    selectedOption: undefined,
};

export default SortingButton;
