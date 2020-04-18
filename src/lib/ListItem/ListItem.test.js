import React from 'react';
import { mount } from 'enzyme';

import ListItem from './index';

describe('<ListItem />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<ListItem />);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render an empty list item, without children present', () => {
        expect(wrapper.find('li')).toHaveLength(1);
        expect(wrapper.find('li')).toBeEmptyRender();
    });

    it('should render a list item, when children are present', () => {
        wrapper.setProps({ children });
        expect(wrapper.find('li')).toHaveLength(1);
        expect(wrapper.find('li')).toHaveText('List Item Text');
    });
});

const children = <span>List Item Text</span>;
