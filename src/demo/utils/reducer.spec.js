import { expect } from 'chai';
import { stub } from 'sinon';

import { createReducer } from './reducer';

describe('reducer utilities', () => {
    describe('createReducer(initialState, handlers)', () => {
        // Build the actionTypes
        const actionTypes = {
            ONE: 'action:ONE',
            TWO: 'action:TWO',
        };
        // Stub out the actions
        const actions = {
            one: stub(),
            two: stub(),
        };
        // Build the handlers with the actionTypes and actions
        const handlers = {
            [actionTypes.ONE]: actions.one,
            [actionTypes.TWO]: actions.two,
        };
        // Define an initial state
        let INITIAL_STATE = {
            one: {},
            two: {
                id: '042012',
                name: 'Stub for Two',
            },
        };

        it('should return the passed in initial state for both actions', () => {
            // Define the action(s)
            const action_1 = { type: actionTypes.ONE };
            const action_2 = { type: actionTypes.TWO };
            // Build the reducer
            const reducer = createReducer(INITIAL_STATE, handlers);
            // Stub out the final result
            actions.one.withArgs(INITIAL_STATE, action_1).returns(INITIAL_STATE);
            actions.two.withArgs(INITIAL_STATE, action_2).returns({
                ...INITIAL_STATE,
                two: {
                    id: '234203',
                    name: 'Updated name for two',
                },
            });
            // Fire up the reducer with the arguments
            const action_1_result = reducer(INITIAL_STATE, action_1);
            const action_2_result = reducer(INITIAL_STATE, action_2);
            // Test for stub as well as the results
            expect(actions.one.called).to.be.true();
            expect(action_1_result).to.eql(INITIAL_STATE);
            expect(action_2_result).to.eql({
                ...INITIAL_STATE,
                two: {
                    id: '234203',
                    name: 'Updated name for two',
                },
            });
        });

        it('should return the passed in initial state as the action is empty', () => {
            // Build the reducer
            const reducer = createReducer(INITIAL_STATE, handlers);
            // Fire up the reducer with no arguments
            const result = reducer();
            // Test for stub as well as the result
            expect(result).to.eql(INITIAL_STATE);
        });
    });
});
