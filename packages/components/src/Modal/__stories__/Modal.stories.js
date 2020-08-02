import React from 'react';

import { Button } from '../../index';
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
	useModalContext,
} from '../index';

export default {
	component: Modal,
	title: 'Components/Modal',
};

function CloseButton({ children = 'Done', variant = 'primary' }) {
	const { dialog } = useModalContext();

	return (
		<Button onClick={dialog.hide} variant={variant}>
			{children}
		</Button>
	);
}

export const _default = () => {
	return (
		<Modal renderTrigger={<ModalTrigger>Open</ModalTrigger>} visible>
			<ModalHeader title={'Modal Title'} />
			<ModalBody>
				<h2>First</h2>
				<Modal renderTrigger={<ModalTrigger>Open</ModalTrigger>}>
					<ModalHeader title={'Inner Modal Title'} />
					<ModalBody>
						<h2>Second</h2>
						<Modal
							renderTrigger={<ModalTrigger>Open</ModalTrigger>}
						>
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
