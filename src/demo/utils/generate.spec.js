import { expect } from 'chai';
import { stub } from 'sinon';

import * as generateFunctions from './generate';

// Start the tests
describe('generate utilities', () => {
    describe('genClassName(length)', () => {
        let mathRandom;

        beforeEach(() => {
            // Create a global Math.random object that returns `0.5` always.
            // const mockMath = Object.create(global.Math);
            // mockMath.random = () => 0.5;
            // global.Math = mockMath;

            // Stub out the global Math.random()
            mathRandom = stub(global.Math, 'random');
            mathRandom.returns(0.5);
        });

        afterEach(() => {
            // Restore the stubs
            mathRandom.restore();
        });

        it('should generate MC41 as the className', () => {
            const btoaRand = btoa(mathRandom());
            expect(generateFunctions.genClassName()).to.equal(btoaRand);
            expect(generateFunctions.genClassName(0)).to.equal(btoaRand);
            expect(generateFunctions.genClassName(5)).to.equal(btoaRand);
            expect(generateFunctions.genClassName(10)).to.equal(btoaRand);
            expect(generateFunctions.genClassName(13)).to.equal(btoaRand);
            // The callCount should be 5,
            // 1 for the main btoaRand initialization
            // 5 for the genClassName() function calls
            expect(mathRandom.callCount).to.equal(6);
        });
    });
});
