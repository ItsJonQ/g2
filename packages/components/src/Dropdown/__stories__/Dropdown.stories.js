import React from 'react';

import {
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
} from '../index';

export default {
	component: Dropdown,
	title: 'Components/Dropdown',
};

export const _default = () => {
	return (
		<Dropdown visible>
			<DropdownTrigger>Dropdown</DropdownTrigger>
			<DropdownMenu>
				<DropdownMenuItem>One</DropdownMenuItem>
				<DropdownMenuItem>Two</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
			</DropdownMenu>
		</Dropdown>
	);
};
