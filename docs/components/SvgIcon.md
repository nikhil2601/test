[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > SvgIcon

--------------------------------------------------------------------------------

# SvgIcon

**src**: [SvgIcon.js](/src/lib/SvgIcon/SvgIcon.js)

The `SvgIcon` component takes in an SVG `path` element and converts it to a React element that displays the path.

## Example

The following example is taken directly from the `[TrashIcon](/src/lib/SvgIcon/types/TrashIcon.js)` component.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../SvgIcon';

const TrashIcon = ({ ...rest }) => (
    <SvgIcon {...rest}>
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </SvgIcon>
);

TrashIcon.propTypes = {
    viewBox: PropTypes.string
};

TrashIcon.defaultProps = {
    viewBox: '0 0 24 24'
};

export default TrashIcon;
```

## Props

```javascript
/**
 * Children passed into the SvgIcon.
 */
children: PropTypes.node,
/**
 * Set the color of the SvgIcon.
 */
color   : PropTypes.oneOfType([
    PropTypes.oneOf(['dark', 'error', 'inherit', 'light', 'primary', 'success', 'warning']),
    PropTypes.string
]),
/**
 * Provides a human-readable title for the element that contains it.
 * https://www.w3.org/TR/SVG-access/#Equivalent
 */
titleAccess: PropTypes.string,
/**
 * The viewBox attribute defines the position and dimension,
 * in user space, of an SVG viewport.
 * The value of the viewBox attribute is a list of four numbers:
 * min-x, min-y, width and height, separated by whitespace and/or a comma,
 * which specify a rectangle in user space which is mapped to the bounds
 * of the viewport established for the associated element.
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
 */
viewBox    : PropTypes.string
```

## Default Props

```javascript
children   : null,
color      : 'dark',
titleAccess: null,
viewBox    : '0 0 24 24'
```
