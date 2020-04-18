import React from 'react';
import { shallow } from 'enzyme';

import SvgIcon from './index';

describe('<SvgIcon />', () => {
    const wrapper = shallow(<SvgIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
