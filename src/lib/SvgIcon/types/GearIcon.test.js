import React from 'react';
import { shallow } from 'enzyme';

import GearIcon from './GearIcon';

describe('<GearIcon />', () => {
    const wrapper = shallow(<GearIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
