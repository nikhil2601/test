import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import styled from 'styled-components';

import { genID } from 'utils/generate';
import { getThemeProps } from 'utils/theme';
import Divider from 'lib/Divider';

import Item from './Item';
import Key from './Key';
import Value from './Value';

const KeyValuePairsStyled = styled.ul`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    list-style: none;
    margin: 0;
    padding: 0;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('KeyValuePairs.styles')};
`;

const ValueComponentStyled = styled.div`
    flex: 1 1 65%;
    ${getThemeProps('KeyValuePairsValue.styles')};
`;

const KeyValuePairs = ({ items, itemKey, onItemClick, itemValue, keySuffix, showDivider }) => (
    <KeyValuePairsStyled>
        {items.map(item => {
            const theKey = _get(item, itemKey, itemKey);
            const theValue = _get(item, itemValue, itemValue);
            const onClick = _isFunction(onItemClick) ? () => onItemClick(item) : null;
            const { [itemValue]: ValueComponent } = item;

            return (
                <React.Fragment key={genID()}>
                    <Item key={genID('KeyItem')} onClick={onClick}>
                        <Key>{`${theKey}${keySuffix}`}</Key>
                        {React.isValidElement(ValueComponent) ? (
                            <ValueComponentStyled>{ValueComponent}</ValueComponentStyled>
                        ) : (
                            <Value>{theValue}</Value>
                        )}
                    </Item>
                    {showDivider && <Divider />}
                </React.Fragment>
            );
        })}
    </KeyValuePairsStyled>
);

KeyValuePairs.propTypes = {
    /**
     * The `key` to extract from the item.
     * Key is inserted into the first column of the KeyValuePairs.
     */
    itemKey: PropTypes.string,
    /**
     * The `value` to extract from the item.
     * Value is inserted into the second column of the KeyValuePairs.
     *
     * @type {[type]}
     */
    itemValue: PropTypes.string,
    /**
     * The list of items for the KeyValuePairs
     */
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    keySuffix: PropTypes.string,
    /**
     * The `onClick` prop for the item.
     */
    onItemClick: PropTypes.func,

    showDivider: PropTypes.bool,
};

KeyValuePairs.defaultProps = {
    itemKey: '',
    itemValue: '',
    keySuffix: '',
    onItemClick: null,
    showDivider: false,
};

export default KeyValuePairs;
