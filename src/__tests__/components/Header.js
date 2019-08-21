import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/layouts/Header';

Enzyme.configure({adapter: new Adapter()});

function setup() {
	const props = {
		title: 'Header',
	};

	const enzymeWrapper = shallow(<Header {...props} />);

	return {
		props,
		enzymeWrapper,
	};
}

describe('components', () => {
	describe('Header', () => {
		it('should render self and subcomponents', () => {
			const {enzymeWrapper} = setup();

			expect(enzymeWrapper.find('header').hasClass('header')).toBe(true);

			expect(enzymeWrapper.find('h1').text()).toBe('Header');
		});
	});
});
