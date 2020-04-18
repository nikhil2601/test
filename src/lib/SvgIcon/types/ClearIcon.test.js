import React from 'react';
import { shallow } from 'enzyme';

import ClearIcon from './ClearIcon';

describe('<ClearIcon />', () => {
    const wrapper = shallow(<ClearIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
