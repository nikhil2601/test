import React from 'react';
import { shallow } from 'enzyme';

import { TableRow } from './index';

describe('<TableRow />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TableRow />);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
