import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Box from 'lib/Box';
import Row from 'lib/Row';

import { themeGet } from 'utils/theme';

const AlertStyled = styled(Box)`
    ${({ backgroundColor, borderColor }) => css`
        background-color: ${themeGet(
            `palette.${backgroundColor}.backgroundColor`,
            backgroundColor
        )};
        border-color: ${themeGet(`palette.${borderColor}.borderColor`, borderColor)};
        position: relative;
    `};
`;

const Alert = React.forwardRef((props, ref) => {
    const { children, ...rest } = props;

    return (
        <AlertStyled padding="12px 20px" {...rest} ref={ref}>
            <Row alignItems="left" justify="left" gutter={false}>
                {children}
            </Row>
        </AlertStyled>
    );
});

Alert.propTypes = {
    children: PropTypes.node,
};

Alert.defaultProps = {
    children: null,
};

export default Alert;
