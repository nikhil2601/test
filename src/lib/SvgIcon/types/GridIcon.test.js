import React from 'react';
import { shallow } from 'enzyme';

import GridIcon from './GridIcon';

describe('<GridIcon />', () => {
    const wrapper = shallow(<GridIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
