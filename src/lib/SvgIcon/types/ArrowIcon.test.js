import React from 'react';
import { shallow } from 'enzyme';

import ArrowIcon from './ArrowIcon';

describe('<ArrowIcon />', () => {
    let wrapper;

    it('should render correctly by default', () => {
        wrapper = shallow(<ArrowIcon />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Up Arrow', () => {
        wrapper = shallow(<ArrowIcon direction="up" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Down Arrow', () => {
        wrapper = shallow(<ArrowIcon direction="down" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Left Arrow', () => {
        wrapper = shallow(<ArrowIcon direction="left" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly as Right Arrow', () => {
        wrapper = shallow(<ArrowIcon direction="right" />);
        expect(wrapper).toMatchSnapshot();
    });
});
