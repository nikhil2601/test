[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Divider

--------------------------------------------------------------------------------

# Divider

**src**: [Divider.js](/src/lib/Divider/Divider.js)

`Divider` help separate separate content. It renders a native `hr` HTML element, adding on the requested properties and styles.

## Example

```jsx
import React from 'react';
import { Divider, Typography } from 'pep-comp';

const Component = () => (
    <div>
        <Typography type="title">My Title</Typography>
        <Divider light />
    </div>
);

export default Component;
```

## Props

Any extra `props` supplied will be spread to the root `hr` HTML native element.

```javascript
/**
 * Apply themed styling to Divider.
 *
 * Colors can be defined in `theme.palette`.
 */
color      : PropTypes.string,
/**
 * The height for the divider.
 */
height     : PropTypes.string,
/**
 * Lighten the shade of the Divider.
 */
light      : PropTypes.bool,
/**
 * Add a custom margin.
 */
margin     : PropTypes.string,
/**
 * Render a transparent divider.
 * The `<Divider />` can be used as a spacer.
 */
transparent: PropTypes.bool,
/**
 * The width for the Divider.
 */
width      : PropTypes.string
```

## Default Props

```javascript
color      : 'dark',
height     : '1px',
light      : false,
margin     : '10px 0',
transparent: false,
width      : '100%'
```
