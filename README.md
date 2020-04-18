# Pepcus components

A JavaScript SDK.

pep-comp is a library of data-driven UI components, that receive their data-structure, HTML template, CSS styles, Event handlers, and data from an outside source, to render in the browser. These declarative UI components are here to help you plug-in to any platform, without writing a whole lotta code.

To help speed up development time, we have abstracted out the key aspects of our pep-comp 'super' components into a set of reusable configurations described in either a JSON or a JavaScript Object format. Each of these pep-comp 'super' components takes 4 different types of configurations:

DataShape (metadata schema) type: object - Describes the metadata for the component, including API information, expected shape of the data returned from api, and more.
Presentation (theme) type: object - Describes how each of the rendered items in the component are styled and laid out.
Data type: object || any - The data that is to be re-presented by the component; unnecessary if API information is provided in the previous metadata schema.
Actions (optional) type: object - A set of custom action handlers used by the component and its internals.
Even though pep-comp components are built with the popular React.js library, these components can be used with together with the other popular libraries / frameworks such as Angular, Vue.js, and more.

If you would like to deeply understand and extend the pep-comp components, you will need a good grasp of React.js, Styled Components, and other related JavaScript concepts and libraries. Please refer to the reading-material section below for more details.

## NOTE!

Please make sure you have the following versions of Node.js and NPM installed. (it's always good to be up-to-date with these two).

Node.js version `> 7.x` and NPM version `> 5.x` required to run and build the library.

## Table of Contents

- [Installation](/docs/Installation.md)
- [Available Components](/docs/components/README.md)
- [Available Helpers](/docs/helpers/README.md)

## Reading Material

Just some light reading to kickstart the project and its inner workings.

### MDN - Mozilla Developer Network

[MDN](https://developer.mozilla.org/en-US/) is a resource for developers, by developers. (tagline taken from MDN website)

### React.js

`React.js` is the library we utilize to build the core of our Components.

- [React docs](https://reactjs.org/) - doesn't get better than this...
- [React stateful Component lifecycle](https://reactjs.org/docs/react-component.html)
- [ReactDOM](https://reactjs.org/docs/react-dom.html)
- [Good interview questions for React.js](https://www.edureka.co/blog/interview-questions/react-interview-questions/)

### Library dependencies

`pep-comp` is dependent on a couple of external 3rd party (MIT licensed) libraries.

- [Axios](https://github.com/axios/axios/blob/master/README.md)
- [Lodash](https://lodash.com/docs/4.17.10)
- [Polished.js](https://polished.js.org/docs/)
- [Popper.js](https://popper.js.org/popper-documentation.html) - used in background...
- [React JSON Schema Form](https://github.com/mozilla-services/react-jsonschema-form)
- [React Transition Group](https://reactcommunity.org/react-transition-group/)
- [Styled Components](https://www.styled-components.com/docs)
