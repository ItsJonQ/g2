import { css, system } from '@wp-g2/system';
import React from 'react';

export default {
	title: 'Example/System',
};

const button = css`
	align-items: center;
	border-radius: ${system.get('buttonBorderRadius')};
	display: inline-flex;
	font-weight: 400;
	justify-content: center;
	line-height: 1.5;
	padding: 0.375em 0.75em;
	text-decoration: none;
	user-select: none;
`;

const buttonLarge = css`
	font-size: 22px;
`;

const Button = ({ isLarge, ...props }) => {
	return <system.button cx={[button, isLarge && buttonLarge]} {...props} />;
};

const Example = () => {
	return (
		<>
			<Button
				css={`
					background: red;
				`}
			>
				Example
			</Button>
		</>
	);
};

export const _default = () => {
	return <Example />;
};
