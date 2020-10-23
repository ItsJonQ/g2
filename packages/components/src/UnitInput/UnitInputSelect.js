import { cx } from '@wp-g2/styles';
import {} from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import * as styles from './UnitInput.styles';
import { UNITS } from './UnitInput.utils';

function UnitInputSelect({ onSelectChange, unit }) {
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
				])}
			>
				{unit}
				<View
					as="select"
					autoFocus={false}
					className={styles.UnitInputSelectElement}
					onBlur={handleOnBlur}
					onChange={handleOnChange}
					onClick={handleOnStopPropagation}
					onFocus={handleOnFocused}
					onMouseDown={handleOnStopPropagation}
					title="Change unit"
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
