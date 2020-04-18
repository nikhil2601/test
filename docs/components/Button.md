[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Button

--------------------------------------------------------------------------------

# Button

**src**: [Button.js](/src/lib/Button/Button.js)

`Button` Component renders a simple `<button />` to the DOM.

It accepts all of the properties of an [HTML `button` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button).

## Example

```jsx
import React from 'react';
import { Button } from 'pep-comp';

const Container = ({ actions }) => (
    <ActionButtons>
        {actions.map(action => (
            <Button {...action} color="light">
                {action.title}
            </Button>
        ))}
    </ActionButtons>
);
```

## Props

Any extra `props` supplied will be spread to the root `button` HTML native element.

```javascript
/**
 * The content of the button.
 */
children  : PropTypes.node,
/**
 * @ignore
 */
className : PropTypes.string,
/**
 * Apply themed styling to Button.
 *
 * Colors can be defined in `theme.palette`.
 */
color     : PropTypes.string,
/**
 * Do not apply a minimum width to the button.
 */
noMinWidth: PropTypes.bool,
/**
 * Default onClick handler for the button
 */
onClick   : PropTypes.func,
/**
 * Give the button a set width.
 */
width     : PropTypes.string
```

## Default Props

```javascript
children  : null,
className : '',
color     : 'primary',
noMinWidth: false,
onClick   : () => {},
width     : null
```
