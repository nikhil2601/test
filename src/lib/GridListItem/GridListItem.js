import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

// const GridListItemContainer = styled.div`
//     display: block;
//     height: 100%;
//     overflow: auto;
//     position: relative;
//     /**
//      * Add all of the remaining styles from theme
//      */
//     ${getThemeProps('GridListItemContainer.styles')};
// `;

const GridListItemStyled = styled.li`
    box-sizing: border-box;
    display: block;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    position: relative;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('GridListItem.styles')};
`;

function GridListItem(props) {
    const { children } = props;

    return <GridListItemStyled>{children}</GridListItemStyled>;
}

GridListItem.propTypes = {
    /**
     * The root node to be rendered into the `GridListItem`
     */
    children: PropTypes.node.isRequired,
};

export default GridListItem;
