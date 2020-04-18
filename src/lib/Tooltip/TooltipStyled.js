import PropTypes from 'prop-types';
import styled from 'styled-components';

import { THEME } from 'constants/theme';
import { getThemeProps } from 'utils/theme';

const TooltipStyled = styled.div`
    ${getThemeProps('typography.caption')};
    border-radius: 4px;
    max-width: 400px;
    padding: 15px;
    position: relative;
    /**
     * Build the Tooltip Arrow.
     */
    &:after {
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: transparent;
        border-width: ${({ arrowSize }) => `${arrowSize}px`};
    }
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('Tooltip.styles')};
    /**
     * Add in dynamic styles.
     */
    ${({ maxWidth, padding, theme, color: colorProps }) => {
        const bgColor = getThemeProps(`palette.${colorProps}.color`, THEME.palette.dark.color, {
            theme,
        });
        const color = getThemeProps(`palette.${colorProps}.text`, THEME.palette.dark.text, {
            theme,
        });

        return {
            backgroundColor: bgColor,
            color: color,
            padding,
            maxWidth,
        };
    }};
    /**
     * Determine the different styles based on the current Tooltip placement.
     */
    ${({ arrowSize, margin: marginProps, placement, theme, color }) => {
        const bgColor = getThemeProps(`palette.${color}.color`, THEME.palette.dark.color, {
            theme,
        });
        const margin = marginProps + arrowSize;

        switch (placement) {
            case 'top-start': {
                return {
                    transformOrigin: 'center bottom',
                    margin: `${margin}px 0`,
                    '&:after': {
                        borderTopColor: bgColor,
                        left: '20%',
                        marginLeft: `-${arrowSize}px`,
                        top: '100%',
                    },
                };
            }
            case 'top': {
                return {
                    transformOrigin: 'center bottom',
                    margin: `${margin}px 0`,
                    '&:after': {
                        borderTopColor: bgColor,
                        left: '50%',
                        marginLeft: `-${arrowSize}px`,
                        top: '100%',
                    },
                };
            }
            case 'top-end': {
                return {
                    transformOrigin: 'center bottom',
                    margin: `${margin}px 0`,
                    '&:after': {
                        borderTopColor: bgColor,
                        left: '80%',
                        marginLeft: `-${arrowSize}px`,
                        top: '100%',
                    },
                };
            }
            case 'right-start': {
                return {
                    transformOrigin: 'left center',
                    margin: `0 ${margin}px`,
                    '&:after': {
                        borderRightColor: bgColor,
                        marginTop: `-${arrowSize}px`,
                        right: '100%',
                        top: '20%',
                    },
                };
            }
            case 'right': {
                return {
                    transformOrigin: 'left center',
                    margin: `0 ${margin}px`,
                    '&:after': {
                        borderRightColor: bgColor,
                        marginTop: `-${arrowSize}px`,
                        right: '100%',
                        top: '50%',
                    },
                };
            }
            case 'right-end': {
                return {
                    transformOrigin: 'left center',
                    margin: `0 ${margin}px`,
                    '&:after': {
                        borderRightColor: bgColor,
                        marginTop: `-${arrowSize}px`,
                        right: '100%',
                        top: '80%',
                    },
                };
            }
            case 'bottom-start': {
                return {
                    transformOrigin: 'center top',
                    margin: `${margin}px 0`,
                    '&:after': {
                        borderBottomColor: bgColor,
                        bottom: '100%',
                        left: '20%',
                        marginLeft: `-${arrowSize}px`,
                    },
                };
            }
            case 'bottom': {
                return {
                    transformOrigin: 'center top',
                    margin: `${margin}px 0`,
                    '&:after': {
                        borderBottomColor: bgColor,
                        bottom: '100%',
                        left: '50%',
                        marginLeft: `-${arrowSize}px`,
                    },
                };
            }
            case 'bottom-end': {
                return {
                    transformOrigin: 'center top',
                    margin: `${margin}px 0`,
                    '&:after': {
                        borderBottomColor: bgColor,
                        bottom: '100%',
                        left: '80%',
                        marginLeft: `-${arrowSize}px`,
                    },
                };
            }
            case 'left-start': {
                return {
                    transformOrigin: 'right center',
                    margin: `0 ${margin}px`,
                    '&:after': {
                        borderLeftColor: bgColor,
                        left: '100%',
                        marginTop: `-${arrowSize}px`,
                        top: '20%',
                    },
                };
            }
            case 'left': {
                return {
                    transformOrigin: 'right center',
                    margin: `0 ${margin}px`,
                    '&:after': {
                        borderLeftColor: bgColor,
                        left: '100%',
                        marginTop: `-${arrowSize}px`,
                        top: '50%',
                    },
                };
            }
            case 'left-end': {
                return {
                    transformOrigin: 'right center',
                    margin: `0 ${margin}px`,
                    '&:after': {
                        borderLeftColor: bgColor,
                        left: '100%',
                        marginTop: `-${arrowSize}px`,
                        top: '80%',
                    },
                };
            }
            default:
                return {};
        }
    }};
`;

TooltipStyled.propTypes = {
    /**
     * The size of the Tooltip Arrow.
     */
    arrowSize: PropTypes.number.isRequired,
    /**
     * Apply themed styling to Tooltip.
     *
     * Colors can be defined in `theme.palette`.
     */
    color: PropTypes.string,
    /**
     * The distance from the Tooltip to its container.
     */
    margin: PropTypes.number,
    /**
     * The padding for the rendered Tooltip container.
     */
    padding: PropTypes.string,
    /**
     * The placement of the Tooltip.
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

TooltipStyled.defaultProps = {
    color: 'dark',
    margin: 10,
    padding: '10px',
};

export default TooltipStyled;
