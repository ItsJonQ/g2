import { useContextSystem } from '@wp-g2/context';
import {
	noop,
	simpleEqual,
	useSealedState,
	useUpdateEffect,
} from '@wp-g2/utils';
import { uniq } from 'lodash';
import { useCallback, useMemo, useReducer } from 'react';

import { useAccordionContext } from './Accordion.Context';

/**
 * @param {any} current
 * @returns {curent is any[] | string}
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

function useInitialState(props = {}) {
	const initialState = useSealedState({
		...props,
		allowMultiple: false || !!props.allowMultiple,
		current: setCurrentState([], props.current),
	});

	return initialState;
}

function useAction(fn) {
	return useCallback(fn, []);
}

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

export function useAccordionState(props) {
	const { onChange = noop, ...otherProps } = useContextSystem(
		props,
		'Accordion',
	);

	const initialState = useInitialState(otherProps);

	const [{ allowMultiple, current }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	// Actions
	const add = useAction((next) => {
		dispatch({ type: 'add', payload: next });
	});
	const remove = useAction((next) => {
		dispatch({ type: 'remove', payload: next });
	});
	const set = useAction((next) => {
		if (allowMultiple) return add(next);

		dispatch({ type: 'set', payload: next });
	});

	// Selectors
	const getIsVisible = (id) => !!id && current?.includes(id);

	// Synchronize props + state
	useUpdateEffect(() => {
		set(props.current);
	}, [set, props.current]);

	useUpdateEffect(() => {
		onChange(current);
	}, [current, onChange]);

	return {
		allowMultiple,
		current,
		getIsVisible,
		add,
		remove,
		set,
	};
}

export function useAccordion({ id, visible: visibleProp }) {
	const {
		add,
		allowMultiple,
		getIsVisible,
		remove,
		set,
	} = useAccordionContext();

	const visible = getIsVisible(id);

	const setVisible = useCallback(
		(nextVisible) => {
			if (!id) return;

			if (nextVisible) {
				if (allowMultiple) {
					add(id);
				} else {
					set(id);
				}
			} else {
				if (allowMultiple) {
					remove(id);
				}
			}
		},
		[add, allowMultiple, remove, set, id],
	);

	useUpdateEffect(() => {
		setVisible(visibleProp);
	}, [visibleProp]);

	return [visible, setVisible];
}

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
