import { useDispatch, useSelect } from '@wordpress/data';
import { createContext, useContext, useEffect } from 'react';

import MODAL_STORE from './store';

export const ModalContext = createContext({ dialog: {} });
export const useModalContext = () => useContext(ModalContext);

/**
 * @param {{ baseId: string, visible: boolean }} dialog
 * @return {{ isUnderLayer: boolean }}
 */
export const useModalState = (dialog) => {
	const { mount, unmount } = useDispatch(MODAL_STORE);
	const { baseId, visible } = dialog;

	useEffect(() => {
		if (visible) {
			mount(baseId);
		} else {
			unmount(baseId);
		}
		return () => {
			unmount(baseId);
		};
	}, [baseId, visible, mount, unmount]);

	const isUnderLayer = useSelect((select) =>
		select(MODAL_STORE).getIsUnderLayer(baseId),
	);

	return { isUnderLayer };
};
