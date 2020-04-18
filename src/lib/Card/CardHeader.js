import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Typography from 'lib/Typography';

const CardHeaderStyled = styled.div``;

/**
 *  Card header section with icons and actions.
 * @method          CardHeader
 * @param           {Object}            props
 * @constructor
 */
function CardHeader(props) {
    const { actionComponent, headerIcon, subTitle, title, ...rest } = props;

    return (
        <CardHeaderStyled {...rest}>
            {headerIcon}
            <Typography type="display1">{title}</Typography>
            <Typography type="display2">{subTitle}</Typography>
            {actionComponent}
        </CardHeaderStyled>
    );
}

CardHeader.propTypes = {
    /**
     *  Custom component for the header section.
     */
    actionComponent: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     *  Icon on the header section.
     */
    headerIcon: PropTypes.node,
    /**
     * Sub title or a small description below title.
     */
    subTitle: PropTypes.string,
    /**
     * Header title.
     */
    title: PropTypes.string,
};

CardHeader.defaultProps = {
    actionComponent: null,
    className: '',
    headerIcon: null,
    subTitle: '',
    title: '',
};

export default CardHeader;
