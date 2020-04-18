import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import Box from 'lib/Box';
import { SearchIcon, ClearIcon } from 'lib/SvgIcon';
import { getThemeProps } from 'utils/theme';

const SearchInputStyled = styled.input`
    background-color: ${getThemeProps('palette.common.white')};
    border: none;
    box-shadow: none;
    color: rgba(127, 143, 164, 1); /* #7F8FA4 */
    display: block;
    font-size: 14px;
    height: 100%;
    line-height: 1.5;
    min-height: 34px;
    padding: 6px;
    width: 100%;
    &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }
    &::placeholder {
        color: rgba(166, 179, 190, 1); /* #A6B3BE */
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
    }
`;

const SearchInputButton = styled.button`
    background: transparent;
    border: 0px;
    color: #c4ccd3;
    font-size: 16px;
    line-height: 1;
    outline: 0;
    padding: 5px 10px 5px 10px;
    text-decoration: none;
    width: 35px;
    svg {
        transition: color 0.15s ease-in;
    }
    &:hover {
        cursor: pointer;
        color: #98a6b2;
    }
    &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }
    /**
     * Add styles for disabled and read-only
     */
    &:disabled {
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

const SearchInputContainer = styled(Box)`
    align-items: stretch;
    color: #7f8fa4;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    line-height: 1.5;
    min-height: 36px;
    overflow: hidden;
    padding: 0;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    width: 100%;
    ${({ focused, theme }) =>
        focused && {
            ...getThemeProps('effects.inputFocus')({ theme })['&:focus'],
        }};
    /**
     * Add in some focus effects
     */
    ${getThemeProps('effects.inputFocus')};
    /**
     * Add styles for disabled and read-only
     */
    ${({ disabled }) =>
        disabled && {
            backgroundColor: '#e1e5e9 !important',
            borderColor: 'transparent !important',
            boxShadow: 'none !important',
            cursor: 'not-allowed',
            userSelect: 'none',
        }};
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('SearchInput.styles')};
`;

class SearchInput extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        inputRef: PropTypes.func,
        onCancel: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        value: PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        inputRef: null,
        onCancel: null,
        onChange: null,
        onClick: null,
        value: '',
    };

    constructor(props) {
        super(props);

        const { value } = this.props;

        this.state = {
            inputFocused: false,
            searchSpec: value,
        };
    }

    clearSearchValue = () => {
        this.setState(() => ({ searchSpec: '' }));
    };

    handleInputBtnClick = e => {
        e.preventDefault();

        const { searchSpec } = this.state;
        const { onCancel } = this.props;
        // If there is no `searchSpec` present, just return.
        if (!searchSpec) {
            return;
        } else {
            // Update the state with the empty `searchSpec`.
            this.setState(() => ({ searchSpec: '' }));
            // Invoke the `onCancel` callback.
            typeof onCancel === 'function' && onCancel(e);
            // Return
            return;
        }
    };

    handleInputOnChange = e => {
        const { onChange } = this.props;
        // Extract the value from the current event
        const value = _get(e, 'target.value');
        // Update the state with the new search spec.
        this.setState(() => ({ searchSpec: value }));
        // Invoke the `onChange` callback.
        typeof onChange === 'function' && onChange(value);
        // Return
        return;
    };

    handleInputOnFocus = () => {
        this.setState(() => ({ inputFocused: true }));
    };

    handleInputOnBlur = () => {
        this.setState(() => ({ inputFocused: false }));
    };

    render() {
        const { inputFocused, searchSpec } = this.state;
        const { disabled, onCancel, onClick, inputRef, ...inputProps } = this.props;

        return (
            <SearchInputContainer
                disabled={disabled}
                focused={inputFocused}
                margin="0"
                padding="0"
                readOnly={disabled}
            >
                <SearchInputButton disabled={disabled} onClick={this.handleInputBtnClick}>
                    {!searchSpec && (
                        <SearchIcon style={{ color: 'inherit', width: 15, height: 15 }} />
                    )}
                    {searchSpec && (
                        <ClearIcon style={{ color: 'inherit', width: 20, height: 20 }} />
                    )}
                </SearchInputButton>
                <SearchInputStyled
                    {...inputProps}
                    disabled={disabled}
                    onBlur={this.handleInputOnBlur}
                    onChange={this.handleInputOnChange}
                    onFocus={this.handleInputOnFocus}
                    readOnly={disabled}
                    ref={inputRef}
                    value={searchSpec}
                />
            </SearchInputContainer>
        );
    }
}

export default SearchInput;
