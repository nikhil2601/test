import PropTypes from 'prop-types';
import React from 'react';
import Divider from 'lib/Divider';
import List from 'lib/List';
import { callFunc } from 'utils/actions';
import { themeGet } from 'utils/theme';

/**
 * Component for Sorting menu item
 *
 * @constructor
 */
function SortingMenuItem({ hideDivider, item, onClickMenuItem, selected, theme }) {
    const listStyle = {
        cursor: 'pointer',
        color: '#848484',
        lineHeight: '100%',
    };

    function getBackgroundColor() {
        return selected ? themeGet(`palette.common.inputDisabled`)({ theme }) : 'transparent';
    }

    function handleMenuItemClick() {
        callFunc(onClickMenuItem, item);
    }

    return (
        <>
            <List
                style={listStyle}
                backgroundColor={getBackgroundColor()}
                padding="10px 15px"
                onClick={handleMenuItemClick}
            >
                {item.label}
            </List>
            {!hideDivider && <Divider height="1px" margin="0" />}
        </>
    );
}

SortingMenuItem.propTypes = {
    /**
     * identifies whether to show divider or not
     */
    hideDivider: PropTypes.bool,
    /**
     * the menu item object
     */
    item: PropTypes.shape({
        label: PropTypes.string,
    }).isRequired,
    /**
     * onClick handler for the menu item
     */
    onClickMenuItem: PropTypes.func,
    /**
     * whether menu item is selected
     */
    selected: PropTypes.bool,
    /**
     * the THEME object
     */
    theme: PropTypes.object,
};

SortingMenuItem.defaultProps = {
    hideDivider: false,
    onClickMenuItem: null,
    selected: false,
    theme: null,
};

export default SortingMenuItem;
