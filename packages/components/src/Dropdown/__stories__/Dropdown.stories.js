import React from 'react';
import { useDialogState } from 'reakit';

import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from '../../index';
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

export const WithModal = () => {
	const dialog = useDialogState({ animated: true });
	return (
		<>
			<Dropdown>
				<DropdownTrigger>Dropdown</DropdownTrigger>
				<DropdownMenu>
					<DropdownMenuItem onClick={dialog.show}>
						One
					</DropdownMenuItem>
					<DropdownMenuItem onClick={dialog.show}>
						Two
					</DropdownMenuItem>
				</DropdownMenu>
			</Dropdown>
			<Modal dialog={dialog}>
				<ModalHeader />
				<ModalBody>Hello</ModalBody>
				<ModalFooter>
					<Button onClick={dialog.hide} variant="primary">
						Save
					</Button>
					<Button onClick={dialog.hide}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export const _default = () => {
	return (
		<Dropdown visible>
			<DropdownTrigger>Dropdown</DropdownTrigger>
			<DropdownMenu>
				<DropdownMenuItem>One</DropdownMenuItem>
				<DropdownMenuItem>Two</DropdownMenuItem>
				<DropdownMenuItem>Three</DropdownMenuItem>
				<Divider />
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

export const _renderFunction = () => {
	return (
		<Dropdown visible>
			{({ onClose }) => {
				return (
					<>
						<DropdownTrigger>Dropdown</DropdownTrigger>
						<DropdownMenu>
							<DropdownMenuItem onClick={onClose}>
								One
							</DropdownMenuItem>
							<DropdownMenuItem>Two</DropdownMenuItem>
							<DropdownMenuItem>Three</DropdownMenuItem>
						</DropdownMenu>
					</>
				);
			}}
		</Dropdown>
	);
};
