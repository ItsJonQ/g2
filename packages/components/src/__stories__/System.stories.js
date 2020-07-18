import { connect } from '@wp-g2/provider';
import { system } from '@wp-g2/system';
import React from 'react';

// CSS Modules like workflow
import * as styles from './System.styles';

export default {
	title: 'Example/System',
};

const sys = system;

// component library level
// uses system.base component
const BaseButton = ({ children, isLarge, ...props }) => {
	return (
		<sys.button
			{...props}
			cx={[styles.button, isLarge && styles.buttonLarge]}
		>
			<sys.span cx={styles.buttonContent}>{children}</sys.span>
		</sys.button>
	);
};

const Button = connect(BaseButton, 'Button');

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
