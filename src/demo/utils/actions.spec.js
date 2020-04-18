import { expect } from 'chai';

import { createActionsFor } from './actions';

describe('actions utilities', () => {
    describe('createActionsFor(entityName, list)', () => {
        it('should create actions for the given entity name + list pair', () => {
            const name = 'race';
            const actionNamesList = ['START_YOUR_ENGINES', 'REFULE', 'PIT_STOP'];

            expect(createActionsFor(name, actionNamesList)).to.eql({
                START_YOUR_ENGINES: 'race:START_YOUR_ENGINES',
                START_YOUR_ENGINES_FAILURE: 'race:START_YOUR_ENGINES_FAILURE',
                START_YOUR_ENGINES_SUCCESS: 'race:START_YOUR_ENGINES_SUCCESS',
                REFULE: 'race:REFULE',
                REFULE_FAILURE: 'race:REFULE_FAILURE',
                REFULE_SUCCESS: 'race:REFULE_SUCCESS',
                PIT_STOP: 'race:PIT_STOP',
                PIT_STOP_FAILURE: 'race:PIT_STOP_FAILURE',
                PIT_STOP_SUCCESS: 'race:PIT_STOP_SUCCESS',
            });
        });
        it('should return an empty object when the actionNamesList is not an array', () => {
            const name = 'race';
            const actionNamesList = {
                start: 'START_YOUR_ENGINES',
            };

            expect(createActionsFor(name, actionNamesList)).to.eql({});
        });
    });
});
