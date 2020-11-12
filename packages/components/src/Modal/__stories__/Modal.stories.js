import React from 'react';

import { Button } from '../../index';
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
	useModalContext,
	useModalState,
} from '../index';

export default {
	component: Modal,
	title: 'Components/Modal',
};

const CloseButton = React.forwardRef(
	({ children = 'Done', variant = 'primary' }, ref) => {
		const { dialog } = useModalContext();

		return (
			<Button onClick={dialog.hide} ref={ref} variant={variant}>
				{children}
			</Button>
		);
	},
);

export const _default = () => {
	return (
		<Modal trigger={<ModalTrigger>Open</ModalTrigger>} visible>
			<ModalHeader title={'Modal Title'} />
			<ModalBody>
				<h2>First</h2>
				<Modal trigger={<ModalTrigger>Open</ModalTrigger>}>
					<ModalHeader title={'Inner Modal Title'} />
					<ModalBody>
						<h2>Second</h2>
						<Modal trigger={<ModalTrigger>Open</ModalTrigger>}>
							<ModalHeader title={'Third Inner Modal Title'} />
							<ModalBody>
								<h2>Third</h2>
							</ModalBody>
							<ModalFooter>
								<CloseButton />
							</ModalFooter>
						</Modal>
					</ModalBody>
				</Modal>
			</ModalBody>
		</Modal>
	);
};

export const Controlled = () => {
	const dialog = useModalState();

	return (
		<>
			<Button onClick={dialog.toggle}>Secondary toggle</Button>
			<Modal state={dialog} trigger={<ModalTrigger>Open</ModalTrigger>}>
				<ModalHeader title={'Modal Title'} />
				<ModalBody>
					<h2>Controlled Modal</h2>
				</ModalBody>
			</Modal>
		</>
	);
};
