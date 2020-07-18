/** @jsx jsx */
import { connect } from '@wp-g2/provider';
import { jsx } from '@wp-g2/system';
import React from 'react';

// CSS Modules like workflow
import * as styles from './System.styles';

export default {
	title: 'Example/System',
};

// component library level
// uses system.base component
const BaseButton = ({ children, isLarge, ...props }) => {
	return (
		<button {...props} cx={[styles.Button, isLarge && styles.Large]}>
			<span cx={styles.Content}>{children}</span>
		</button>
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
