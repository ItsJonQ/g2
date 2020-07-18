import { css, system } from '@wp-g2/system';
import React from 'react';

export default {
	title: 'Example/System',
};

const sys = system;
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

const buttonContent = css`
	padding: 20px;
`;

// component library level
// uses system.base component
const Button = ({ children, isLarge, ...props }) => {
	return (
		<sys.button
			cx={[button, isLarge && buttonLarge]}
			ns="Button"
			{...props}
		>
			<sys.span cx={buttonContent} ns="ButtonContent">
				{children}
			</sys.span>
		</sys.button>
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
