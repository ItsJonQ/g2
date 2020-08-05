import { createStore } from '@wp-g2/context';
import { createContext, useContext, useEffect, useRef } from 'react';

export const ModalContext = createContext({ dialog: {} });
export const useModalContext = () => useContext(ModalContext);

const [useBaseModalStore] = createStore((setState, getState) => ({
	getIsUnderLayer: (ref) => {
		const { isStacked, modals } = getState();
		const latestRef = modals[modals.length - 1];

		if (!isStacked) return false;

		return latestRef !== ref;
	},
	getState,
	isStacked: false,
	modals: [],
	mount: (ref) => {
		setState((state) => {
			const modals = [...state.modals, ref];
			const isStacked = modals.length > 1;

			return { isStacked, modals };
		});
	},
	unmount: (ref) => {
		setState((state) => {
			const modals = state.modals.filter((m) => m !== ref);
			const isStacked = modals.length > 1;

			return { isStacked, modals };
		});
	},
}));

export const useModalStore = () => useRef(useBaseModalStore()).current;

export const useModalState = (dialog) => {
	const modalStore = useModalStore();
	const { getIsUnderLayer } = modalStore;
	const { baseId, visible } = dialog;

	useEffect(() => {
		if (visible) {
			modalStore.mount(baseId);
		} else {
			modalStore.unmount(baseId);
		}
		return () => {
			modalStore.unmount(baseId);
		};
	}, [baseId, modalStore, visible]);

	const isUnderLayer = getIsUnderLayer(baseId);

	return { isUnderLayer };
};
