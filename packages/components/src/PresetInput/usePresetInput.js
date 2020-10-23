import { shallowCompare, useSubState } from '@wp-g2/substate';
import { mergeEventHandlers, mergeValidationFunctions } from '@wp-g2/utils';
import React from 'react';

import { useUnitInput } from '../UnitInput/useUnitInput';
import { findMatch, formatTypeAheadValue } from './PresetInput.utils';

const usePresetStore = ({ presets = [] } = {}) => {
	const store = useSubState((set) => ({
		presets,
		typeAhead: '',
		clear: () => set({ typeAhead: '' }),
		change: (next) => set({ typeAhead: next }),

		// Selectors
		getMatch: (value) =>
			findMatch({ presets: store.getState().presets, value }),
		getHasMatchExact: (value) => {
			const match = store.getState().getMatch(value);
			return value.toLowerCase() === match?.label?.toLowerCase();
		},
	}));

	return store;
};

const usePresetFocusHandlers = ({ presetStore, store }) => {
	const handleOnBlur = React.useCallback(
		(event) => {
			const { getMatch, typeAhead } = presetStore.getState();
			if (typeAhead) {
				event.stopPropagation();
				const match = getMatch(typeAhead);

				store.getState().change(match.label);
				store.getState().commit();
			}
		},
		[store, presetStore],
	);

	return {
		onBlur: handleOnBlur,
	};
};

const usePresetChangeHandlers = ({ presetStore, store }) => {
	const handleOnValueChange = React.useCallback(
		(value) => {
			const { change, clear, getMatch } = presetStore.getState();

			const match = getMatch(value);

			if (!match || !value) {
				clear();
				return;
			}

			const typeAhead = formatTypeAheadValue({
				value,
				label: match?.label,
			});

			change(typeAhead);
		},
		[presetStore],
	);

	const handleOnValueCommit = React.useCallback(
		(value) => {
			const { clear, getMatch } = presetStore.getState();

			const match = getMatch(value);

			if (!match || !value) {
				clear();
				return;
			}

			const typeAhead = formatTypeAheadValue({
				value,
				label: match?.label,
			});

			store.getState().change(typeAhead);
			store.getState().commit();
		},
		[presetStore, store],
	);

	React.useEffect(() => {
		return store.subscribe(
			handleOnValueChange,
			(state) => state.value,
			shallowCompare,
		);
	}, [handleOnValueChange, store]);

	React.useEffect(() => {
		return store.subscribe(
			handleOnValueCommit,
			(state) => state.commitValue,
			shallowCompare,
		);
	}, [handleOnValueCommit, store]);
};

const usePresetEventHandlers = ({ presetStore, store }) => {
	usePresetChangeHandlers({ store, presetStore });

	const focusHandlers = usePresetFocusHandlers({ store, presetStore });

	return {
		...focusHandlers,
	};
};

export const usePresetInput = (props) => {
	const { arrows = false, validate: validateProp, ...otherProps } = props;
	const presetStore = usePresetStore(otherProps);

	const validate = () => true;
	const mergedValidations = mergeValidationFunctions(validate, validateProp);

	const { __store: store, __unitStore, ...unitInput } = useUnitInput({
		...props,
		arrows,
		validate: mergedValidations,
	});

	const eventHandlers = usePresetEventHandlers({ store, presetStore });
	const mergedEventHandlers = mergeEventHandlers(
		eventHandlers,
		unitInput.inputProps,
	);

	unitInput.inputProps = {
		...unitInput.inputProps,
		...mergedEventHandlers,
	};

	return {
		__store: store,
		__unitStore,
		__presetStore: presetStore,
		...unitInput,
	};
};
