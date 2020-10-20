import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { View } from '../View';
import * as styles from './PresetInput.styles';
import { formatTypeAheadValue } from './PresetInput.utils';

function PresetPlaceholder({ presetStore, store }) {
	const value = store((state) => state.value, shallowCompare);
	const getMatch = presetStore((state) => state.getMatch, shallowCompare);

	const match = getMatch(value);
	let placeholderValue;

	if (match && match.label !== value) {
		placeholderValue = formatTypeAheadValue({ label: match.label, value });
	}

	if (!placeholderValue) return null;

	return (
		<View className={styles.PresetInputTypeAhead}>{placeholderValue}</View>
	);
}

export default React.memo(PresetPlaceholder);
