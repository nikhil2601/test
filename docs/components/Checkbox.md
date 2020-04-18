[pep-comp](/) > [docs](/docs/README.md) > [components](/docs/components/README.md) > Checkbox

--------------------------------------------------------------------------------

# Checkbox

**src**: [Checkbox.js](/src/lib/Checkbox/Checkbox.js)

`Checkbox` allows the user to select single or multiple values from a given set.

## Example

```jsx
import React, { Component } from 'react';
import { Checkbox } from 'pep-comp';

class SelectList extends Component {
    state = {
        list: [
            {
                id: 'one',
                label: '1 - One'
            },
            {
                id: 'two',
                label: '2 - Two'
            },
            {
                id: 'three',
                label: '3 - Three'
            }
        ],
        checked: null
    };

    handleChange = id => (event, checked) => {
        if (checked) {
            this.setState(() => ({ checked: id }));
        }
    };

    render() {
        const { list } = this.state;

        return (
            <div>
                {list.map(item => (
                    <span key={item.id}>
                        <Checkbox {...item} onChange={this.handleChange(item.id)} />
                        <label>{item.label}</label>
                    </span>
                ))}
            </div>
        );
    }
}

export default SelectList;
```

## Props

Any extra `props` supplied will be spread to the internal [`ButtonSwitch` Component](/docs/components/ButtonSwitch.md).

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
checkedIcon: <CheckboxIconActive />,
className  : '',
disabled   : false,
icon       : <CheckboxIconInActive />,
id         : null,
inputProps : null,
inputRef   : null,
name       : '',
onBlur     : null,
onChange   : null,
onFocus    : null,
type       : 'checkbox',
value      : ''
```
