import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { getThemeProps } from 'utils/theme';

const TitleFieldStyled = styled.label`
    color: #848484;
    font-size: 14px;
    font-weight: 400;
    margin: 0 0 10px 15px;
    padding: 0;
    /**
     * Add all of the remaining styles from the theme
     */
    ${getThemeProps('TitleField.styles')};
    /**
     * Add in the dynamic styles
     */
    ${({ root, theme }) => {
        const rootStyles = getThemeProps('TitleField.styles.root', null, { theme });

        return root ? rootStyles : null;
    }};
`;

function TitleField({ id, title, ...rest }) {
    return (
        title && (
            <TitleFieldStyled {...rest} htmlFor={id}>
                {title}
            </TitleFieldStyled>
        )
    );
}

TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
};

TitleField.defaultProps = {
    id: null,
    title: null,
};

export default TitleField;
