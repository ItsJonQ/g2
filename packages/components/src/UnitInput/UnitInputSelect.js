import { __ } from '@wordpress/i18n';
import { cx, ui } from '@wp-g2/styles';
import {} from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import * as styles from './UnitInput.styles';
import { UNITS } from './UnitInput.utils';

function UnitInputSelect({ disabled, onSelectChange, unit }) {
	const [isFocused, setFocused] = React.useState(false);

	const handleOnChange = React.useCallback(
		(event) => {
			onSelectChange(event.target.value);
		},
		[onSelectChange],
	);

	const handleOnBlur = React.useCallback(() => setFocused(false), []);
	const handleOnFocused = React.useCallback(() => setFocused(true), []);

	const handleOnStopPropagation = React.useCallback((event) => {
		event.stopPropagation();
	}, []);

	if (!unit) return null;

	return (
		<View className={styles.UnitInputSelect}>
			<View
				className={cx([
					styles.UnitInputSelectUnit,
					isFocused && styles.unitSelectFocused,
					disabled && styles.disabled,
				])}
			>
				{unit}
				<View
					{...ui.$('UnitInputSelect')}
					as="select"
					className={styles.UnitInputSelectElement}
					disabled={disabled}
					onBlur={handleOnBlur}
					onChange={handleOnChange}
					onClick={handleOnStopPropagation}
					onFocus={handleOnFocused}
					onMouseDown={handleOnStopPropagation}
					title={__('Change unit')}
					value={unit}
				>
					{UNITS.map((i) => (
						<option key={i} value={i}>
							{i}
						</option>
					))}
				</View>
			</View>
		</View>
	);
}

export default React.memo(UnitInputSelect);
