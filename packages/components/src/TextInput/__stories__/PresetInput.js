import { shallowCompare, useSubState } from '@wp-g2/substate';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { View } from '../../View';
import { TextInputArrows } from './TextInputArrows';
import { useTextInputUnit } from './UnitInput';
import { mergeEventHandlers, mergeValidationFunctions } from './utils';

function formatTypeAheadValue({ label, value }) {
	let typeAhead = label;

	if (typeAhead) {
		typeAhead = [
			value,
			typeAhead.substring(value.length, typeAhead.length),
		].join('');
	}

	return typeAhead;
}

function findMatch({ presets = [], value }) {
	const match = presets.find((entry) => {
		const { label } = entry;
		if (!value) return false;
		const matcher = value.toLowerCase();

		return label?.toLowerCase().indexOf(matcher) === 0;
	});

	return match;
}

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

const useTextPresetInput = (props) => {
	const { presets, validate: validateProp, ...otherProps } = props;
	const presetStore = usePresetStore({ presets });
	const validate = () => !!presetStore.getState().typeAhead;

	const mergedValidations = mergeValidationFunctions(validate, validateProp);

	const { store, ...textInput } = useTextInputUnit({
		...otherProps,
		validate: mergedValidations,
	});

	const eventHandlers = usePresetEventHandlers({ store, presetStore });
	const mergedEventHandlers = mergeEventHandlers(eventHandlers, textInput);

	const typeAhead = presetStore((state) => state.typeAhead, shallowCompare);

	return {
		...textInput,
		...mergedEventHandlers,
		typeAhead: typeAhead || textInput.typeAhead,
	};
};

export const PresetInput = React.memo((props) => {
	const {
		decrement,
		increment,
		store,
		typeAhead,
		...textInput
	} = useTextPresetInput({
		...props,
		validate: noop,
	});

	return (
		<View
			css={`
				position: relative;
			`}
		>
			<View
				as="input"
				css={`
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0.2;
					pointer-events: none;
					z-index: 1;
				`}
				onChange={noop}
				tabIndex={-1}
				type="text"
				value={typeAhead}
			/>
			<View as="input" type="text" {...textInput} />
			<TextInputArrows decrement={decrement} increment={increment} />
		</View>
	);
});
