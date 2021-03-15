import { render, screen } from '@testing-library/react';
import React from 'react';

import { BaseButton } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<BaseButton>I like warm hugs</BaseButton>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render type', () => {
		render(
			<>
				<BaseButton type="submit">Submit</BaseButton>
				<BaseButton href="#">Link</BaseButton>
			</>,
		);

		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
		expect(screen.getByRole('link')).not.toHaveAttribute('type');
	});
});
