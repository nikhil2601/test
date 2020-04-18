import React from 'react';
import { shallow } from 'enzyme';

import Table from './index';

describe('<Table />', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Table debug />);

        expect(component).toMatchSnapshot();
    });
});
