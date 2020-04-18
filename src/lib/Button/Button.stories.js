import React from 'react';
import { action, actions } from '@storybook/addon-actions';
import styled from 'styled-components';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Button from './Button';
import ButtonIcon from './ButtonIcon';
import ButtonLink from './ButtonLink';
import ButtonSecondary from './ButtonSecondary';
import Typography from '../Typography';
import FaIcon from '../FaIcon';
import ButtonSwitch from './ButtonSwitch';

const inputRef = React.createRef();

const Icon = styled.i`
    position: absolute;
    width: 64px;
    height: 66px;
    left: 24%;
    top: 25%;
    background-image: url('');
    background-size: 194px 134px;
    ${props => props.styles};
`;

export default {
    title: 'Button',
    component: Button,
};

export const defaultButton = () => <Button onClick={action('button-click')}>Default Button</Button>;

export const customizedButton = () => (
    <Button
        align="right"
        border="5px"
        borderRadius="10%"
        color="secondary"
        padding="25px"
        margin="50px"
        width="250px"
        minHeight="100px"
    >
        Customized Button
    </Button>
);

export const softlyDisableButton = () => <Button softDisable>Softly Disable Button</Button>;

export const buttonAsIcon = () => (
    <ButtonIcon onClick={action('button-click')} color="dark" noMinWidth>
        <Icon />
    </ButtonIcon>
);

export const buttonAsLink = () => (
    <ButtonLink
        href="https://www.google.com/"
        target="_blank"
        style={{ display: 'inherit', width: '90%' }}
    >
        <Typography type="display1" noWrap gutterBottom="0">
            Click Me
        </Typography>
    </ButtonLink>
);

export const secondaryButton = () => (
    <ButtonSecondary width="200px" onClick={action('button-click')}>
        Secondary Button
    </ButtonSecondary>
);

const eventsFromObject = actions({
    onFocus: 'clicked',
    onMouseOver: 'hovered',
    onMouseOut: 'blur',
    onChange: 'onChange',
});

export const buttonSwitch = () => (
    <ButtonSwitch
        checkedIcon={<FaIcon color="#114e8f" height="30px" width="30px" icon={faPlus} />}
        icon={<FaIcon color="#114e8f" height="30px" width="30px" icon={faMinus} />}
        id="buttonId"
        inputRef={inputRef}
        onClick={action('button-click')}
        value="switch"
        type="checkbox"
        name="buttonSwitch"
        style={{ width: 48, height: 48, borderRadius: 'inherit', background: 'beige' }}
        {...eventsFromObject}
    >
        Switch Button
    </ButtonSwitch>
);

export const disabledButtonSwitch = () => (
    <ButtonSwitch
        disabled
        checkedIcon={<FaIcon color="#114e8f" height="30px" width="30px" icon={faPlus} />}
        icon={<FaIcon color="#114e8f" height="30px" width="30px" icon={faMinus} />}
        id="buttonId"
        inputRef={inputRef}
        onClick={action('button-click')}
        value="switch"
        type="checkbox"
        name="buttonSwitch"
        style={{ width: 48, height: 48, borderRadius: 'inherit', background: 'beige' }}
        {...eventsFromObject}
    >
        Switch Button
    </ButtonSwitch>
);
