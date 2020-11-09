import { FiBold, FiItalic, FiUnderline } from '@wp-g2/icons';
import React from 'react';

import {
	Button,
	FormGroup,
	ListGroup,
	ListGroupHeader,
	ListGroups,
} from '../../index';
import { ButtonGroup } from '../index';

export default {
	component: ButtonGroup,
	title: 'Components/ButtonGroup',
};

export const _default = () => {
	const [value, setValue] = React.useState('bold');

	return (
		<ListGroups>
			<ListGroup>
				<ListGroupHeader>Default</ListGroupHeader>
				<FormGroup>
					<ButtonGroup onChange={setValue} value={value}>
						<Button icon={<FiBold />} value="bold" />
						<Button icon={<FiItalic />} value="italic" />
						<Button icon={<FiUnderline />} value="underline" />
					</ButtonGroup>
				</FormGroup>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Segmented</ListGroupHeader>
				<FormGroup>
					<ButtonGroup onChange={setValue} segmented value={value}>
						<Button icon={<FiBold />} value="bold" />
						<Button icon={<FiItalic />} value="italic" />
						<Button icon={<FiUnderline />} value="underline" />
					</ButtonGroup>
				</FormGroup>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Expanded</ListGroupHeader>
				<FormGroup>
					<ButtonGroup expanded onChange={setValue} value={value}>
						<Button icon={<FiBold />} value="bold" />
						<Button icon={<FiItalic />} value="italic" />
						<Button icon={<FiUnderline />} value="underline" />
					</ButtonGroup>
				</FormGroup>
			</ListGroup>
			<ListGroup>
				<ListGroupHeader>Segmented + Expanded</ListGroupHeader>
				<FormGroup>
					<ButtonGroup
						expanded
						onChange={setValue}
						segmented
						value={value}
					>
						<Button icon={<FiBold />} value="bold" />
						<Button icon={<FiItalic />} value="italic" />
						<Button icon={<FiUnderline />} value="underline" />
					</ButtonGroup>
				</FormGroup>
			</ListGroup>
		</ListGroups>
	);
};

export const _expanded = () => {
	const [value, setValue] = React.useState('bold');

	return (
		<>
			<ButtonGroup expanded onChange={setValue} value={value}>
				<Button icon={<FiBold />} value="bold" />
				<Button icon={<FiItalic />} value="italic" />
				<Button icon={<FiUnderline />} value="underline" />
			</ButtonGroup>
		</>
	);
};

export const _segmented = () => {
	const [value, setValue] = React.useState('bold');

	return (
		<>
			<ButtonGroup onChange={setValue} segmented value={value}>
				<Button icon={<FiBold />} value="bold" />
				<Button icon={<FiItalic />} value="italic" />
				<Button icon={<FiUnderline />} value="underline" />
			</ButtonGroup>
		</>
	);
};
