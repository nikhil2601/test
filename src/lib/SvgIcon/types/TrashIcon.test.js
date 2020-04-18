import React from 'react';
import { shallow } from 'enzyme';

import TrashIcon from './TrashIcon';

describe('<TrashIcon />', () => {
    const wrapper = shallow(<TrashIcon />);

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
