import _isEmpty from 'lodash/isEmpty';
import { getDisplayName, isClassComponent } from 'recompose';
import { isValidElement } from 'react';

/**
 * Get information about the Picklist Component,
 * if the `picklist` exists in the provided `context`.
 *
 * @method getPicklistComponent
 * @param  {Array}              [context=[]] The list of picklists (context)
 * @param  {Object}             [props={}]   Props for each of the picklist component
 * @return {Object}                          The info about the Picklist Component
 */
export function getPicklistComponent(context = [], props = {}) {
    // Find the picklist compoent from the context.
    const PicklistComponent =
        !_isEmpty(props) &&
        props.id &&
        context.find(item => getDisplayName(item).includes(props.id));
    // Determine whether the found component is a valid React Component.
    // This validation excludes HTML tagNames, and strings, it must be either
    // a functional stateless or statefull or styled component.
    const valid = isValidElement(PicklistComponent) || isClassComponent(PicklistComponent);
    // If needed, we can assign a `ref` for the wrapped or regular React Component.
    const PicklistRef = valid && (PicklistComponent.WrappedComponent || PicklistComponent);

    return {
        valid,
        picklistProps: props,
        Component: PicklistComponent,
        componentRef: PicklistRef,
    };
}
