import { useContextSystem } from '@wp-g2/context';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { is, noop, simpleEqual, uniq, useUpdateEffect } from '@wp-g2/utils';
import { useCallback, useEffect, useMemo } from 'react';

const isCurrentValid = (current) => is.array(current) || is.string(current);

const sanitizeState = (next) => uniq(next.filter(Boolean));

const setCurrentState = (prev = [], next) => {
	if (!isCurrentValid(next)) return prev;
	const nextState = is.array(next) ? [...prev, ...next] : [...prev, next];

	return sanitizeState(nextState);
};

export function useAccordion(props) {
	const {
		allowMultiple = false,
		current,
		onChange = noop,
		...otherProps
	} = useContextSystem(props, 'Accordion');

	const accordionStore = useSubState((set) => ({
		// State
		current: setCurrentState([], current),

		// Actions
		add: (next) => {
			if (!isCurrentValid(next)) return;

			set((prev) => {
				return { current: setCurrentState(prev.current, next) };
			});
		},

		remove: (next) => {
			if (!isCurrentValid(next)) return;

			set((prev) => {
				return {
					current: sanitizeState(
						prev.current.filter((id) => id === next),
					),
				};
			});
		},

		set: (next) => {
			if (!isCurrentValid(next)) return;
			if (accordionStore.getState().isEqual(next)) return;

			if (allowMultiple) {
				return accordionStore.getState().add(next);
			}
			set(() => {
				const nextState = is.array(next) ? [next[0]] : [next];
				return { current: sanitizeState(nextState) };
			});
		},

		clear: () => {
			set(() => ({ current: [] }));
		},

		// Selectors
		has: (id) => accordionStore.getState().current.includes(id),
		isEqual: (next) => simpleEqual(accordionStore.getState().current, next),
		isVisible: (id) => !!accordionStore.getState().has(id),
	}));

	const store = useSubState(
		() => ({
			// Actions
			update: ({ id, visible = false }) => {
				if (visible) {
					if (allowMultiple) {
						accordionStore.getState().add(id);
					} else {
						accordionStore.getState().set(id);
					}
				} else {
					if (allowMultiple) {
						accordionStore.getState().remove(id);
					} else {
						// accordionStore.getState().clear();
					}
				}
			},
			useAccordionState: ({ id, visible }) => {
				const state = accordionStore(
					(prev) => prev.isVisible(id),
					shallowCompare,
				);
				const setState = useCallback(
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

	// Sync incoming current prop
	useUpdateEffect(() => {
		accordionStore.getState().set(current);
	}, [current]);

	// Commit current state to prop
	useEffect(() => {
		return accordionStore.subscribe(
			(next) => {
				onChange(next);
				console.log(next);
			},
			(state) => state.current,
			shallowCompare,
		);
	}, [accordionStore, onChange]);

	const contextValue = useMemo(
		() => ({
			store,
			useAccordionState: store.getState().useAccordionState,
		}),
		[store],
	);

	return {
		contextValue,
		...otherProps,
	};
}
