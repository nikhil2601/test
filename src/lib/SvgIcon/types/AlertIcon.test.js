import React from 'react';
import { shallow } from 'enzyme';

import AlertIcon from './AlertIcon';

describe('<AlertIcon />', () => {
    const wrapper = shallow(<AlertIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
