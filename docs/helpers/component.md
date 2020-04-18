[pep-comp](/) > [docs](/docs/README.md) > [helpers](/docs/helpers/README.md) > component

--------------------------------------------------------------------------------

# component

**src**: [component.js](/src/lib/utils/component.js)

These are some `biased` utility functions that we use internally for `pep-comp`. We thought it would be good to expose these to the public API, as we found them to be very useful during our dev / build cycle.

All of the examples below will refer to the following declarations to be present when running the tests:

```jsx
const reactElement = <button />;
const domComp = 'button';
const styledComp = styled.div`
    background-color: red;
`;
const functionalComp = props => <button>{props.text}</button>;
const ClassComp = class extends Component {
    render() {
        return (
            <div>
                <button>Hello</button>
            </div>
        );
    }
};
```

## isClassComponent

Determine if the Component is a React Class Component

```javascript
import { isClassComponent } from 'pep-comp';
// False
expect(isClassComponent(reactElement)).to.be.false();
expect(isClassComponent(domComp)).to.be.false();
expect(isClassComponent(functionalComp)).to.be.false();
// True
expect(isClassComponent(ClassComp)).to.be.true();
expect(isClassComponent(styledComp)).to.be.true();
```

## isDOMTypeComponent

Determine if the Component is a React Element and HTML DOM type. i.e. `'div', 'hr', 'p', 'h3', etc.`

```javascript
import { isDOMTypeComponent } from 'pep-comp';
// False
expect(isDOMTypeComponent(reactElement)).to.be.false();
expect(isDOMTypeComponent(functionalComp)).to.be.false();
expect(isDOMTypeComponent(ClassComp)).to.be.false();
expect(isDOMTypeComponent(styledComp)).to.be.false();
// True
expect(isDOMTypeComponent(domComp)).to.be.true();
```

## isFunctionalComponent

Determine if the Component is a React Element and a Composite (Functional) Component. i.e. `const Button = ({ width }) => <button width={width}>Hello</button>;`

```javascript
import { isFunctionalComponent } from 'pep-comp';
// False
expect(isFunctionalComponent(reactElement)).to.be.false();
expect(isFunctionalComponent(domComp)).to.be.false();
expect(isFunctionalComponent(ClassComp)).to.be.false();
expect(isFunctionalComponent(styledComp)).to.be.false();
// True
expect(isFunctionalComponent(functionalComp)).to.be.true();
```

## isReactComponent

Determine if the Component is a React Component, functional, styled, or Class component.

```javascript
import { isReactComponent } from 'pep-comp';
// False
expect(isReactComponent(reactElement)).to.be.false();
expect(isReactComponent(domComp)).to.be.false();
// True
expect(isReactComponent(functionalComp)).to.be.true();
expect(isReactComponent(ClassComp)).to.be.true();
expect(isReactComponent(styledComp)).to.be.true();
```

## getDocumentOwner

Get the top-level `document` object for the given node.

See: [ownerDocument](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)

```javascript
import { getDocumentOwner } from 'pep-comp';
// Tests (all true)
expect(getDocumentOwner()).to.equal(document);
expect(getDocumentOwner(reactElement)).to.equal(document);
expect(getDocumentOwner(domComp)).to.equal(document);
expect(getDocumentOwner(functionalComp)).to.equal(document);
expect(getDocumentOwner(ClassComp)).to.equal(document);
expect(getDocumentOwner(styledComp)).to.equal(document);
```

## getContainer

Get the current container based on it being an Object, or a Functional Component

Referring to the tests for this one...

```javascript
import { getContainer } from 'pep-comp';
import { renderIntoDocument } from 'react-dom/test-utils';

it('should return me the default container', () => {
    expect(getContainer(null, reactElement)).to.equal(reactElement);
});

it('should return me the passed in container', () => {
    const element = renderIntoDocument(reactElement);
    expect(getContainer(element)).to.equal(element);
});

it('should return me the functional container', () => {
    const container = () => undefined;
    expect(getContainer(container)).to.equal(container());
});
```

## getAnchorEl

Get the anchor element for the given element.

Referring to the tests for this one...

```javascript
import { getAnchorEl } from 'pep-comp';
import { renderIntoDocument } from 'react-dom/test-utils';

it('should return me the functional anchor element', () => {
    const element = () => undefined;
    expect(getAnchorEl(element)).to.equal(element());
});

it('should return me the passed in anchor element', () => {
    const element = renderIntoDocument(reactElement);
    expect(getAnchorEl(element)).to.equal(element);
});
```
