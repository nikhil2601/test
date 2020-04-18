import PropTypes from 'prop-types';
import React from 'react';

const withActionHandlers = WrappedComponent =>
    class WithActionHandlers extends React.Component {
        static propTypes = {
            /**
             * The action handlers passed to the WrappedComponent
             */
            actions: PropTypes.array,
            /**
             * Extra set of handlers passed to the WrappedComponent
             */
            handlers: PropTypes.object,
        };

        static defaultProps = {
            actions: [],
            handlers: {},
        };

        wrappedRef = React.createRef();

        componentDidMount() {
            const { actions: actionsList } = this.props;

            if (actionsList.length > 0 && this.wrappedRef.current) {
                actionsList.forEach(action => {
                    const eventProps = this.getEventProps(action);

                    eventProps.shouldBind &&
                        this.wrappedRef.current.addEventListener(
                            eventProps.mouseevent,
                            eventProps.wrappedHandler
                        );
                });
            }
        }

        componentWillUnmount() {
            const { actions: actionsList } = this.props;

            if (actionsList.length > 0 && this.wrappedRef.current) {
                actionsList.forEach(action => {
                    const eventProps = this.getEventProps(action);

                    eventProps.shouldBind &&
                        this.wrappedRef.current.removeEventListener(
                            eventProps.mouseevent,
                            eventProps.wrappedHandler
                        );
                });
            }
        }

        getEventProps = action => {
            const { handlers: handlersList } = this.props;
            const mouseevent = action.mouseevent || null;
            const handlerRef = action.handlerRef || null;
            const handler = handlersList[handlerRef] || null;
            const shouldBind = Boolean(mouseevent && handler && this.wrappedRef.current);

            const wrappedHandler = event =>
                typeof handler === 'function' &&
                handler(this.props, this.wrappedRef, action, event);

            return {
                mouseevent,
                shouldBind,
                wrappedHandler,
            };
        };

        render() {
            return <WrappedComponent {...this.props} setRef={this.wrappedRef} />;
        }
    };

export default withActionHandlers;
