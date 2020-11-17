import { __ } from '@wordpress/i18n';
import { FiChevronDown } from '@wp-g2/icons';
import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { Button } from '../Button';
import { View } from '../View';
import * as styles from './PresetInput.styles';

function PresetInputSelect({ presetStore, store }) {
	const presets = presetStore((state) => state.presets, shallowCompare);
	const selectRef = React.useRef();
	const [isFocused, setIsFocused] = React.useState(false);

	const handleOnChange = React.useCallback(
		(event) => {
			const match = presets.find((p) => p.key === event.target.value);
			if (match) {
				presetStore.getState().clear();
				store.getState().change(match.label);
				store.getState().commit();
			}
		},
		[presetStore, presets, store],
	);

	return (
		<View className={styles.PresetInputSelect}>
			<Button
				className={styles.PresetInputSelectButton}
				icon={<FiChevronDown />}
				iconSize={14}
				isBlock
				isControl
				isFocused={isFocused}
				isSplit
				isSubtle
				tabIndex={-1}
			/>
			<View
				as="select"
				className={styles.PresetInputSelectElement}
				onBlur={() => setIsFocused(false)}
				onChange={handleOnChange}
				onClick={(e) => e.stopPropagation()}
				onFocus={() => setIsFocused(true)}
				ref={selectRef}
				title={__('Change preset')}
			>
				{presets.map((preset) => (
					<option key={preset.key} value={preset.key}>
						{preset.label}
					</option>
				))}
			</View>
		</View>
	);
}

export default React.memo(PresetInputSelect);
