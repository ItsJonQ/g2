import { useContextSystem } from '@wp-g2/context';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { is, noop, simpleEqual, useUpdateEffect } from '@wp-g2/utils';
import { uniq } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';

/**
 * @param {any} current
 * @returns {curent is any[] | string}
 */
const isCurrentValid = (current) =>
	Array.isArray(current) || is.string(current);

/**
 * @param {string[]} next
 */
const sanitizeState = (next) => uniq(next.filter(Boolean));

/**
 * @param {string[]} prev
 * @param {string | string[]} next
 */
const setCurrentState = (prev = [], next) => {
	if (!isCurrentValid(next)) return prev;
	const nextState = Array.isArray(next)
		? [...prev, ...next]
		: [...prev, next];

	return sanitizeState(nextState);
};

/**
 * @typedef AccordionStore
 * @property {string[]} current
 * @property {(next: string[] | string) => void} add
 * @property {(next: string) => void} remove
 * @property {(next: string[] | string) => void} set
 * @property {() => void} clear
 * @property {(id: string | undefined) => boolean} has
 * @property {(next: string[] | string) => boolean} isEqual
 * @property {(id: string | undefined) => boolean} isVisible
 */

/**
 * @typedef {[boolean, (next: boolean) => void]} AccordionState
 */

/**
 * @typedef Store
 * @property {(options: { id?: string, visible?: boolean }) => void} update
 * @property {(options: { id?: string, visible?: boolean }) => AccordionState} useAccordionState
 */

/**
 * @typedef Props
 * @property {boolean} [allowMultiple=false]
 * @property {(current: string[] | null) => void} [onChange]
 * @property {string[]} current
 */

/**
 * @param {Props} props
 */
export function useAccordion(props) {
	const {
		allowMultiple = false,
		current,
		onChange = noop,
		...otherProps
	} = useContextSystem(props, 'Accordion');

	/** @type {import('zustand').UseStore<AccordionStore>} */
	const accordionStore = useSubState((
		/** @type {import('zustand').SetState<AccordionStore>} */ set,
	) => ({
		// State
		current: setCurrentState([], current),

		// Actions
		add: (/** @type {string[] | string} */ next) => {
			if (!isCurrentValid(next)) return;

			set((prev) => {
				return { current: setCurrentState(prev.current, next) };
			});
		},

		remove: (/** @type {string} */ next) => {
			if (!isCurrentValid(next)) return;

			set((prev) => {
				return {
					current: sanitizeState(
						prev.current.filter((id) => id === next),
					),
				};
			});
		},

		set: (/** @type {string[] | string} */ next) => {
			if (!isCurrentValid(next)) return;
			if (accordionStore.getState().isEqual(next)) return;

			if (allowMultiple) {
				return accordionStore.getState().add(next);
			}
			set(() => {
				const nextState = Array.isArray(next) ? [next[0]] : [next];
				return { current: sanitizeState(nextState) };
			});
		},

		clear: () => {
			set(() => ({ current: [] }));
		},

		// Selectors
		has: (/** @type {string | undefined} */ id) =>
			!!id && accordionStore.getState().current.includes(id),
		isEqual: (/** @type {string[] | string} */ next) =>
			simpleEqual(accordionStore.getState().current, next),
		isVisible: (/** @type {string | undefined} */ id) =>
			!!accordionStore.getState().has(id),
	}));

	/** @type {import('zustand').UseStore<Store>} */
	const store = useSubState(() => ({
		// Actions
		update: ({ id, visible = false }) => {
			if (!id) return;

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
				(/** @type {boolean} */ next) => {
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
	}));

	// Sync incoming current prop
	useUpdateEffect(() => {
		accordionStore.getState().set(current);
	}, [current]);

	// Commit current state to prop
	useEffect(() => {
		return accordionStore.subscribe(
			onChange,
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
