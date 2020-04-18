import React from 'react';
import { shallow } from 'enzyme';

import TableCell from './index';

describe('<TableCell />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TableCell />);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
