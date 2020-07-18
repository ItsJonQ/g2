import { ComponentsProvider } from '@wp-g2/provider';
import { css, system } from '@wp-g2/system';
import React from 'react';

export default {
	title: 'Example/System',
};

const { get } = system;

const button = css`
	background: ${get('colorBrand')};
	border-radius: ${get('buttonBorderRadius')};
	color: ${get('colorBrandText')};
	display: inline-flex;
	font-weight: 400;
	justify-content: center;
	padding: ${get('buttonPadding')};
	user-select: none;
`;

const buttonLarge = css`
	font-size: 22px;
`;

// component library level
// uses system.base component
const Button = ({ isLarge, ...props }) => {
	return (
		<system.button
			cx={[button, isLarge && buttonLarge]}
			ns="Button"
			{...props}
		/>
	);
};

// consumer level
// overrides can happen with special css prop, enabled by system.base
const Example = () => {
	return (
		<>
			<Button
				css={`
					background: red;
				`}
				isLarge
			>
				Example
			</Button>
		</>
	);
};

export const _default = () => {
	return <Example />;
};
