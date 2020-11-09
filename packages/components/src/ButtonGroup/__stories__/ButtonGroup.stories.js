import { FiBold, FiItalic, FiUnderline } from '@wp-g2/icons';
import React from 'react';

import { Button } from '../../index';
import { ButtonGroup } from '../index';

export default {
	component: ButtonGroup,
	title: 'Components/ButtonGroup',
};

const Example = () => {
	const [value, setValue] = React.useState('bold');

	return (
		<>
			<ButtonGroup expanded onChange={setValue} value={value}>
				<Button icon={<FiBold />} value="bold" />
				<Button icon={<FiItalic />} value="italic" />
				<Button icon={<FiUnderline />} value="underline" />
			</ButtonGroup>
			<ButtonGroup onChange={setValue} value={value}>
				<Button icon={<FiBold />} value="bold" />
				<Button icon={<FiItalic />} value="italic" />
				<Button icon={<FiUnderline />} value="underline" />
			</ButtonGroup>
		</>
	);
};

export const _default = () => {
	return <Example />;
};
