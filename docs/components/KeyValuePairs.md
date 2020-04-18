[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > KeyValuePairs

--------------------------------------------------------------------------------

# KeyValuePairs

**src**: [KeyValuePairs.js](/src/lib/KeyValuePairs/KeyValuePairs.js)

`KeyValuePairs` renders a simple Key and Value pairs list.

## Example

```jsx
import React from 'react';
import { KeyValuePairs, Typography } from 'pep-comp';

const ITEMS = [
    {
        key: 'username',
        value: 'StarWars'
    },
    {
        key: 'email',
        value: 'luke@starwars.com'
    }
];

const KeyValueSample = () => (
    <div>
        <Typography type="title">Key Values Sample</Typography>
        <KeyValuePairs items={ITEMS} />
    </div>
);

export default KeyValueSample;
```

## Props

```javascript
/**
 * The `key` to extract from the item.
 * Key is inserted into the first column of the KeyValuePairs.
 */
itemKey    : PropTypes.string,
/**
 * The `value` to extract from the item.
 * Value is inserted into the second column of the KeyValuePairs.
 *
 * @type {[type]}
 */
itemValue  : PropTypes.string,
/**
 * The list of items for the KeyValuePairs
 */
items      : PropTypes.arrayOf(PropTypes.object).isRequired,
/**
 * The `onClick` prop for the item.
 */
onItemClick: PropTypes.func
```

## Default Props

```javascript
itemKey    : '',
onItemClick: null,
itemValue  : ''
```
