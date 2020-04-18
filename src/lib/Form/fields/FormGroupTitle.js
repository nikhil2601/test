import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import Row from 'lib/Row';
import FaIcon from 'lib/FaIcon';
import Tooltip from 'lib/Tooltip';
import Typography from 'lib/Typography';
import { getThemeProps } from 'utils/theme';

const FormGroupTitleStyled = styled.label`
    align-items: baseline;
    color: #15191d;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    justify-content: space-between;
    margin: 0;
    padding: 0 5px 7.5px 5px;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('FormGroupTitle.styles')};
`;

function FormGroupTitle({ id, required, title, helpText }) {
    const { icon = {}, ...tooltip } = helpText;

    return (
        title && (
            <FormGroupTitleStyled htmlFor={id}>
                <Row alignItems="flex-start" gutter={false} margin="0 5px 0 0" wrap="nowrap">
                    <span style={{ marginRight: 5 }}>{title}</span>
                    {typeof helpText === 'object' && !_isEmpty(helpText) && (
                        <Tooltip {...tooltip}>
                            <FaIcon {...icon} icon={faInfoCircle} />
                        </Tooltip>
                    )}
                </Row>
                {required && (
                    <Typography as="span" color="error" type="required" gutterBottom="0">
                        Required
                    </Typography>
                )}
            </FormGroupTitleStyled>
        )
    );
}

FormGroupTitle.propTypes = {
    helpText: PropTypes.object,
    id: PropTypes.string,
    required: PropTypes.bool,
    title: PropTypes.string,
};

FormGroupTitle.defaultProps = {
    helpText: {},
    id: null,
    required: false,
    title: null,
};

export default FormGroupTitle;
