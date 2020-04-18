import React from 'react';
import { shallow } from 'enzyme';

import EyeIcon from './EyeIcon';

describe('<EyeIcon />', () => {
    const wrapper = shallow(<EyeIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
