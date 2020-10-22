import { useContextSystem } from '@wp-g2/context';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { useUpdateEffect } from '@wp-g2/utils';
import React from 'react';

export function useAccordion(props) {
	const { allowMultiple = false, current, ...otherProps } = useContextSystem(
		props,
		'Accordion',
	);

	const accordionStatesStore = useSubState((set) => ({
		// State
		current: [current],

		// Actions
		add: (next) => set((prev) => ({ current: [...prev.current, next] })),
		remove: (next) =>
			set((prev) => prev.current.filter((id) => id === next)),
		set: (next) => set({ current: [next] }),

		// Selectors
		has: (id) => accordionStatesStore.getState().current.includes(id),
		isVisible: (id) => !!accordionStatesStore.getState().has(id),
	}));

	const store = useSubState(
		() => ({
			// Actions
			update: ({ id, visible = false }) => {
				if (visible) {
					if (allowMultiple) {
						accordionStatesStore.getState().add(id);
					} else {
						accordionStatesStore.getState().set(id);
					}
				} else {
					if (allowMultiple) {
						accordionStatesStore.getState().remove(id);
					}
				}
			},
			useAccordionState: ({ id, visible }) => {
				const state = accordionStatesStore(
					(prev) => prev.isVisible(id),
					shallowCompare,
				);
				const setState = React.useCallback(
					(next) => {
						store.getState().update({ id, visible: next });
					},
					[id],
				);

				// Sync controlled state
				useUpdateEffect(() => {
					store.getState().update({ id, visible });
				}, [setState, visible]);

				return [state, setState];
			},
		}),
		[],
	);

	const contextValue = React.useMemo(
		() => ({
			store,
			useAccordionState: store.getState().useAccordionState,
		}),
		[store],
	);

	// Sync
	useUpdateEffect(() => {
		accordionStatesStore.getState().set(current);
	}, [current]);

	return {
		contextValue,
		...otherProps,
	};
}
