import { useContextSystem } from '@wp-g2/context';
import { simpleEqual, useSealedState, useUpdateEffect } from '@wp-g2/utils';
import { noop, uniq } from 'lodash';
import { useCallback, useMemo, useReducer } from 'react';

import { useAccordionContext } from './Accordion.Context';

/**
 * @param {any} current
 * @returns {current is any[] | string}
 */
const isCurrentValid = (current) =>
	Array.isArray(current) || typeof current === 'string';

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
 * @typedef State
 * @property {boolean} allowMultiple
 * @property {string[]} current
 * @property {boolean} isWithinContext
 */

/**
 * @param {State} initialState
 * @returns {State}
 */
function useInitialState({ allowMultiple = false, current }) {
	const initialState = useSealedState({
		allowMultiple,
		current: setCurrentState([], current),
		isWithinContext: true,
	});

	return initialState;
}

/** @typedef {string | string[]} Payload */

/** @typedef {{ type: 'add', payload: Payload }} AddAction */
/** @typedef {{ type: 'remove', payload: Payload }} RemoveAction */
/** @typedef {{ type: 'set', payload: Payload }} SetAction */

/**
 * @typedef {
	| AddAction
	| RemoveAction
	| SetAction
} Action
 */

/** @typedef {import('react').Dispatch<Action>} AccordionDispatch */

/**
 * @param {State} state
 * @param {Action} action
 *
 * @returns {State}
 */
function reducer(state, action) {
	const { current } = state;

	switch (action.type) {
		case 'add': {
			const { payload: next } = action;

			if (!isCurrentValid(next)) return state;
			if (!simpleEqual(current, next)) return state;

			return { ...state, current: setCurrentState(current, next) };
		}

		case 'remove': {
			const { payload: next } = action;

			if (!isCurrentValid(next)) return state;

			return {
				...state,
				current: sanitizeState(current.filter((id) => id === next)),
			};
		}

		case 'set': {
			const { payload: next } = action;

			if (!isCurrentValid(next)) return state;
			if (simpleEqual(current, next)) return state;

			const nextState = Array.isArray(next) ? [next[0]] : [next];
			return { ...state, current: sanitizeState(nextState) };
		}

		default: {
			return state;
		}
	}
}

/**
 * @param {AccordionDispatch} dispatch
 * @param {Payload} payload
 */
export function add(dispatch, payload) {
	dispatch({ type: 'add', payload });
}

/**
 * @param {AccordionDispatch} dispatch
 * @param {Payload} payload
 */
export function remove(dispatch, payload) {
	dispatch({ type: 'remove', payload });
}

/**
 * @param {AccordionDispatch} dispatch
 * @param {Payload} payload
 * @param {boolean} allowMultiple
 */
export function set(dispatch, payload, allowMultiple) {
	if (allowMultiple) {
		add(dispatch, payload);
	} else {
		dispatch({ type: 'set', payload });
	}
}

/**
 * @typedef {State & { onChange: (current: State['current']) => void }} OwnProps
 */

/**
 * @param {OwnProps} props
 * @returns {import('./Accordion.Context').AccordionContext}
 */
export function useAccordionState(props) {
	const { onChange = noop, ...otherProps } = useContextSystem(
		props,
		'Accordion',
	);

	const initialState = useInitialState(otherProps);

	const [{ allowMultiple, current, isWithinContext }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	// Selectors
	const getIsVisible = (/** @type {string} */ id) =>
		!!id && current?.includes(id);

	// Synchronize props + state
	useUpdateEffect(() => {
		set(dispatch, props.current, allowMultiple);
	}, [props.current]);

	useUpdateEffect(() => {
		onChange(current);
	}, [current, onChange]);

	return {
		allowMultiple,
		current,
		getIsVisible,
		isWithinContext,
		dispatch,
	};
}

/**
 * @typedef Props
 * @property {boolean} [allowMultiple=false]
 * @property {(current: string[] | null) => void} [onChange]
 * @property {string[]} [current]
 * @property {import('react').ReactNode} [children]
 */

/**
 * @param {Props} props
 */
export function useAccordionProps(props) {
	const { children, ...otherProps } = props;
	const accordionState = useAccordionState(otherProps);

	const contextValue = useMemo(() => {
		return accordionState;
	}, [accordionState]);

	return {
		children,
		contextValue,
		...otherProps,
	};
}

/**
 * @param {object} props
 * @param {string} props.id
 * @param {boolean} props.visible
 * @return {[boolean, (id: string) => boolean ]}
 */
export function useAccordion({ id, visible: visibleProp }) {
	const {
		allowMultiple,
		dispatch,
		getIsVisible,
		isWithinContext,
	} = useAccordionContext();

	const visible = isWithinContext ? getIsVisible(id) : visibleProp;

	const setVisible = useCallback(
		(/** @type {boolean} */ nextVisible) => {
			if (!isWithinContext) return;
			if (!id) return;

			if (nextVisible) {
				if (allowMultiple) {
					add(dispatch, id);
				} else {
					set(dispatch, id, allowMultiple);
				}
			} else {
				if (allowMultiple) {
					remove(dispatch, id);
				}
			}
		},
		[id, allowMultiple, dispatch, isWithinContext],
	);

	useUpdateEffect(() => {
		setVisible(visibleProp);
	}, [setVisible, visibleProp]);

	return [visible, setVisible];
}
