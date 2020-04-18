import React, { Component } from 'react';

import { TableContext } from './Table';

/**
 * Wrap a Table Component with the TableContext's Consumer,
 * injecting the Consumer's context values into the Wrapped
 * Component as props.
 *
 * @method withTableContext
 * @param  {Component}         WrappedComponent The Component to wrap
 * @return {Component}                          The wrapped Component
 */
const withTableContext = WrappedComponent =>
    class WithTableContext extends Component {
        componentDidMount() {}

        render() {
            return (
                <TableContext.Consumer>
                    {tableContext => <WrappedComponent {...this.props} {...tableContext} />}
                </TableContext.Consumer>
            );
        }
    };

export default withTableContext;
