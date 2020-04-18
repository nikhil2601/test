[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > ButtonSwitch

--------------------------------------------------------------------------------

# ButtonSwitch

**src**: [ButtonSwitch.js](/src/lib/Button/ButtonSwitch.js)

`ButtonSwitch` toggles the state of a button or the provided components on or off. Think of it like an HTML `checkbox` input. When a `checkbox` is selected, it displays a 'check' otherwise it is a blank 'square'. You can achieve this functionality with a `ButtonSwitch` Component, passing it two icons (checked and icon).

## Example

The following code is taken from the [Checkbox](/src/lib/Checkbox/Checkbox.js) Component, and edited to match the restraints of this example.

```jsx
import styled from 'styled-components';
import { ButtonSwitch } from 'pep-comp';

import CheckboxIconActive from './CheckboxIconActive';
import CheckboxIconInActive from './CheckboxIconInActive';

const Checkbox = styled(ButtonSwitch)`
    color: red;
    font-size: 12px;
    font-family: serif;
`;

Checkbox.propTypes = {
    /**
     * The icon to display when the component is checked.
     */
    checkedIcon: PropTypes.node,
    /**
     * The Icon to display when the component is unchecked.
     */
    icon: PropTypes.node
};

Checkbox.defaultProps = {
    checkedIcon: <CheckboxIconActive />,
    icon: <CheckboxIconInActive />
};
```

## Props

Any extra `props` supplied will be spread to the internal root [`ButtonIcon` Component](/docs/components/ButtonIcon.md).

```javascript
/**
 * If `true`, the component is marked as checked.
 */
checked    : PropTypes.bool,
/**
 * The icon to display when the component is checked.
 */
checkedIcon: PropTypes.node,
/**
 * @ignore
 */
className  : PropTypes.string,
/**
 * If `true`, the Button will be disabled.
 */
disabled   : PropTypes.bool,
/**
 * The Icon to display when the component is unchecked.
 */
icon       : PropTypes.node,
/**
 * The id for the `input` element.
 */
id         : PropTypes.string,
/**
 * The attributes for the `input` element.
 */
inputProps : PropTypes.object,
/**
 * Attaches a React ref to the native input component.
 * Can use a `node => this.ref = node` function, or a `React.createRef()` object.
 */
inputRef   : PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
/**
 * @ignore
 */
name       : PropTypes.string,
/**
 * @ignore
 */
onBlur     : PropTypes.func,
/**
 * Callback fired when the internal state is changed.
 */
onChange   : PropTypes.func,
/**
 * @ignore
 */
onFocus    : PropTypes.func,
/**
 * Set the element to be read-only.
 */
readOnly   : PropTypes.bool,
/**
 * If `true`, the input will be required.
 */
required   : PropTypes.bool,
/**
 * The `type` of internal input.
 */
type       : PropTypes.string,
/**
 * The value of the internal input component.
 */
value      : PropTypes.string
```

## Default Props

```javascript
checked    : null,
checkedIcon: null,
className  : '',
disabled   : false,
icon       : null,
id         : null,
inputProps : null,
inputRef   : null,
name       : '',
onBlur     : null,
onChange   : null,
onFocus    : null,
readOnly   : false,
required   : false,
type       : 'checkbox',
value      : ''
```
