import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { HStack } from '../HStack';
import { SelectDropdown } from '../select-dropdown';
import { TextInput } from '../TextInput';
import { View } from '../View';
import * as styles from './font-size-control-styles';

function FontSizeControlSelect(props, forwardedRef) {
	const {
		customLabel,
		disabled,
		inputValue,
		isDefaultValue,
		label,
		max,
		min,
		onChange = noop,
		onInputChange = noop,
		onReset = noop,
		options = [],
		size,
		value,
		withNumberInput,
		withSelect,
		...otherProps
	} = useContextSystem(props, 'FontSizeControlSelect');

	const renderItem = React.useCallback(
		({ name, style }) => <span style={style}>{name}</span>,
		[],
	);

	return (
		<HStack alignment="left" wrap>
			{withSelect && (
				<View className={styles.SelectDropdownWrapper}>
					<FormGroup label={label}>
						<SelectDropdown
							disabled={disabled}
							max={260}
							onChange={onChange}
							options={options}
							ref={forwardedRef}
							renderItem={renderItem}
							size={size}
							value={value}
							{...otherProps}
						/>
					</FormGroup>
				</View>
			)}
			{withNumberInput && (
				<View className={styles.NumberInputWrapper}>
					<FormGroup label={customLabel}>
						<TextInput
							disabled={disabled}
							max={max}
							min={min}
							onChange={onInputChange}
							size={size}
							type="number"
							value={inputValue}
						/>
					</FormGroup>
				</View>
			)}
			<View className={styles.ResetButtonWrapper}>
				<Button disabled={isDefaultValue} isBlock onClick={onReset}>
					{__('Reset')}
				</Button>
			</View>
		</HStack>
	);
}

export default contextConnect(FontSizeControlSelect, 'FontSizeControlSelect');
