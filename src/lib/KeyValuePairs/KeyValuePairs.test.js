import React from 'react';
import { shallow } from 'enzyme';

import KeyValuePairs from './KeyValuePairs';

describe('KeyValuePairs', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<KeyValuePairs items={[]} debug />);

        expect(component).toMatchSnapshot();
    });
});
