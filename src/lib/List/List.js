import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { themeGet } from 'utils/theme';

import { ListItemStyled } from '../ListItem';

const ListStyled = styled.ul`
    position: relative;
    ${({ listStyle, margin, padding }) => css`
        list-style: ${listStyle || 'none'};
        margin: ${margin || 0};
        padding: ${padding || 0};
    `};
    ${ListItemStyled} {
        border-left: ${({ flush }) => flush && 'none'};
        border-right: ${({ flush }) => flush && 'none'};
        &:first-child {
            border-top-left-radius: ${({ flush }) => flush && '0'};
            border-top-right-radius: ${({ flush }) => flush && '0'};
            border-top: ${({ flush }) => flush && 'none'};
        }
        &:last-child {
            border-bottom-left-radius: ${({ flush }) => flush && '0'};
            border-bottom-right-radius: ${({ flush }) => flush && '0'};
            border-bottom: ${({ flush }) => flush && 'none'};
        }
    }
    /**
     * Add dynamic styles
     */
    ${({ backgroundColor, borderRadius }) => css`
        background-color: ${themeGet(`palette.${backgroundColor}.color`, backgroundColor)};
        border-radius: ${borderRadius};
    `}
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('List.styles')};
`;

/**
 * Lists are continuous, vertical indexes of text or images.
 *
 * @method      List
 * @constructor
 */
const List = React.forwardRef((props, ref) => {
    const { as, children, ordered, ...rest } = props;
    const listAs = ordered ? 'ol' : 'ul';

    return (
        <ListStyled as={listAs} {...rest} ref={ref}>
            {children}
        </ListStyled>
    );
});

List.propTypes = {
    as: PropTypes.string,
    /**
     * Sets the `background-color` CSS property.
     */
    backgroundColor: PropTypes.string,
    /**
     * Sets the `border-radius` css property.
     */
    borderRadius: PropTypes.string,
    borderStyle: PropTypes.string,
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * If `true`, a 1px border is added to the bottom of the list-item.
     */
    divider: PropTypes.bool,
    /**
     * Sets the `list-style` css property.
     */
    listStyle: PropTypes.string,
    /**
     * Sets the `margin` css property.
     */
    margin: PropTypes.string,
    /**
     * Should we render an ordered list `ol` or default to `ul`?
     */
    ordered: PropTypes.bool,
    /**
     * Sets the `padding` css property.
     */
    padding: PropTypes.string,
};

List.defaultProps = {
    as: null,
    backgroundColor: 'transparent',
    borderRadius: null,
    borderStyle: 'initial',
    children: null,
    divider: false,
    listStyle: null,
    margin: null,
    ordered: false,
    padding: null,
};

List.displayName = 'List';

export default List;
