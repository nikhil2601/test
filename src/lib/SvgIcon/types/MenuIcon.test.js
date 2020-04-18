import React from 'react';
import { shallow } from 'enzyme';

import MenuIcon from './MenuIcon';

describe('<MenuIcon />', () => {
    const wrapper = shallow(<MenuIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
