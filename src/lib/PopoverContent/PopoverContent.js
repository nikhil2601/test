import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Box from 'lib/Box';
import { themeGet } from 'utils/theme';

const PopoverContent = styled(Box)`
    ${({ color, maxWidth, theme }) => css`
        background-color: ${themeGet(`palette.${color}.color`, color)};
        color: ${themeGet(`palette.${color}.text`, '#FFFFFF')};
        margin: 0;
        max-width: ${maxWidth};
        position: relative;
    `};
    /**
     * Build the Popover Arrow.
     */
    &:before {
        background-color: ${themeGet('palette.common.white')};
        border-color: ${themeGet('palette.common.lighter')};
        /**
         * Add dynamic styles
         */
        ${({
            arrowSize,
            backgroundColor,
            borderColor,
            borderRadius,
            borderStyle,
            borderWidth,
            boxShadow,
            elevation,
            elevationDirection,
        }) => css`
            background-color: ${themeGet(`palette.${backgroundColor}.color`, backgroundColor)};
            border-color: ${themeGet(`palette.${borderColor}.color`, borderColor)};
            border-radius: ${borderRadius || '4px'};
            border-style: ${borderStyle || 'solid'};
            border-width: ${borderWidth || '1px'};
            box-shadow: ${themeGet(`shadows[${elevationDirection}][${elevation}]`, boxShadow)};
            content: '';
            height: ${arrowSize * 2}px;
            pointer-events: none;
            position: absolute;
            transform: rotate(-45deg);
            width: ${arrowSize * 2}px;
        `};
    }
    /**
     * Determine the different styles based on the current Popover placement.
     */
    ${({
        anchorRef,
        arrowSize,
        boundToAnchor,
        color,
        distanceFromContainer: marginProps,
        placement,
        theme,
    }) => {
        const bgColor = themeGet(`palette.${color}.color`, '#2D2D2D')({ theme });
        const margin = marginProps + arrowSize;
        const anchorRect = anchorRef && anchorRef.getBoundingClientRect();
        const { height: anchorRectHeight = 0 } = anchorRect;

        switch (placement) {
            case 'top-start': {
                return {
                    transformOrigin: 'center bottom',
                    top: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        left: `${arrowSize * 3}px`,
                        marginLeft: `-${arrowSize}px`,
                        top: `calc(100% - ${arrowSize}px)`,
                    },
                };
            }
            case 'top': {
                return {
                    transformOrigin: 'center bottom',
                    top: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        left: '50%',
                        marginLeft: `-${arrowSize}px`,
                        top: `calc(100% - ${arrowSize}px)`,
                    },
                };
            }
            case 'top-end': {
                return {
                    transformOrigin: 'center bottom',
                    top: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        left: `calc(100% - ${arrowSize * 3}px)`,
                        marginLeft: `-${arrowSize}px`,
                        top: `calc(100% - ${arrowSize}px)`,
                    },
                };
            }
            case 'right-start': {
                return {
                    transformOrigin: 'left center',
                    right: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        marginTop: `-${arrowSize}px`,
                        right: `calc(100% - ${arrowSize}px)`,
                        top: boundToAnchor ? `${anchorRectHeight / 2}px` : '20%',
                    },
                };
            }
            case 'right': {
                return {
                    transformOrigin: 'left center',
                    right: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        marginTop: `-${arrowSize}px`,
                        right: `calc(100% - ${arrowSize}px)`,
                        top: '50%',
                    },
                };
            }
            case 'right-end': {
                return {
                    transformOrigin: 'left center',
                    right: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        marginTop: `-${arrowSize}px`,
                        right: `calc(100% - ${arrowSize}px)`,
                        top: boundToAnchor ? `calc(100% - ${anchorRectHeight / 2}px)` : '80%',
                    },
                };
            }
            case 'bottom-start': {
                return {
                    transformOrigin: 'center top',
                    bottom: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        bottom: `calc(100% - ${arrowSize}px)`,
                        left: boundToAnchor ? `${arrowSize * 3}px` : '20%',
                        marginLeft: `-${arrowSize}px`,
                    },
                };
            }
            case 'bottom': {
                return {
                    transformOrigin: 'center top',
                    bottom: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        bottom: `calc(100% - ${arrowSize}px)`,
                        left: '50%',
                        marginLeft: `-${arrowSize}px`,
                    },
                };
            }
            case 'bottom-end': {
                return {
                    transformOrigin: 'center top',
                    bottom: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        bottom: `calc(100% - ${arrowSize}px)`,
                        left: `calc(100% - ${arrowSize * 3}px)`,
                        marginLeft: `-${arrowSize}px`,
                    },
                };
            }
            case 'left-start': {
                return {
                    transformOrigin: 'right center',
                    left: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        left: `calc(100% - ${arrowSize}px)`,
                        marginTop: `-${arrowSize}px`,
                        top: boundToAnchor ? `${anchorRectHeight / 2}px` : '20%',
                    },
                };
            }
            case 'left': {
                return {
                    transformOrigin: 'right center',
                    left: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        left: `calc(100% - ${arrowSize}px)`,
                        marginTop: `-${arrowSize}px`,
                        top: '50%',
                    },
                };
            }
            case 'left-end': {
                return {
                    transformOrigin: 'right center',
                    left: `-${margin}px`,
                    '&:before': {
                        background: bgColor,
                        left: `calc(100% - ${arrowSize}px)`,
                        marginTop: `-${arrowSize}px`,
                        top: boundToAnchor ? `calc(100% - ${anchorRectHeight / 2}px)` : '80%',
                    },
                };
            }
            default:
                return {};
        }
    }};
`;

PopoverContent.propTypes = {
    /**
     * The size of the Popover Arrow.
     */
    arrowSize: PropTypes.number.isRequired,
    /**
     * Apply themed styling to Popover.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * The distance from the Popover to its container.
     */
    distanceFromContainer: PropTypes.number,
    /**
     * The maximum width for the rendered Popover container.
     */
    maxWidth: PropTypes.string,
    /**
     * The placement of the Popover.
     * This goes directly with placements defined in `Popper.js`.
     */
    placement: PropTypes.oneOf([
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
    ]).isRequired,
};

PopoverContent.defaultProps = {
    borderRadius: '0',
    borderWidth: '0',
    color: null,
    distanceFromContainer: null,
    maxWidth: null,
    padding: '0',
    placement: 'bottom',
};

export default PopoverContent;
