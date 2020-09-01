import { render } from '@testing-library/react';
import React from 'react';

import { Animated, AnimatedContainer } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(
			<AnimatedContainer>
				<Animated>I like warm hugs</Animated>
			</AnimatedContainer>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
