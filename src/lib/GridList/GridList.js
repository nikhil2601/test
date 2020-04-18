import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const GridListStyled = styled.div`
    -webkit-overflow-scrolling: touch;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(208px, 208px));
    grid-gap: 26px;
    margin-left: 0;
    margin-right: 0;
    justify-content: space-between;
    flex-flow: row wrap;
    @media (max-width: 767px) {
        justify-content: center;
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('GridList.styles')};
`;

function GridList(props) {
    const { children, cols, spacing } = props;
    return (
        <GridListStyled cols={cols} spacing={spacing}>
            {React.Children.map(children, child => {
                // The child must be a valid element and not a Fragment.
                // With Fragments we don't get a concrete container with sub-children,
                // rather we just get an array of children.
                if (!React.isValidElement(child) || child.type === React.Fragment) {
                    return null;
                }
                // Render each child with updated style
                return React.cloneElement(child, {
                    style: {
                        ...child.props.style,
                    },
                });
            })}
        </GridListStyled>
    );
}

GridList.propTypes = {
    /**
     * Set a pre-determined cell-height for a single `GridList` item.
     * Set to `auto` to have the inner children determine their own height.
     */
    cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    /**
     * The items of the `GridList`.
     */
    children: PropTypes.node.isRequired,
    /**
     * Number of grid-columns.
     */
    cols: PropTypes.number,
    /**
     * The spacing to be added between the `GridList` items.
     */
    spacing: PropTypes.number,
    cellWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
};

GridList.defaultProps = {
    cellHeight: 200,
    cols: 2,
    spacing: 10,
    cellWidth: '200',
};

export default GridList;
