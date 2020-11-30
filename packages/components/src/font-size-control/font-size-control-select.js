import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { is, noop } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Grid } from '../Grid';
import { SelectDropdown } from '../select-dropdown';
import { TextInput } from '../TextInput';
import { View } from '../View';

function FontSizeControlSelect(props, forwardedRef) {
	const {
		customLabel,
		disabled,
		onChange = noop,
		onInputChange = noop,
		label,
		onReset = noop,
		min,
		max,
		options = [],
		size,
		value,
		inputValue,
		withSelect,
		withNumberInput,
		...otherProps
	} = useContextSystem(props, 'FontSizeControlSelect');

	const templateColumns = withNumberInput
		? 'minmax(0, 1fr) 1fr'
		: 'minmax(0, 2fr) 1fr';

	const subControlsTemplateColumns = withNumberInput ? '1fr 1fr' : '1fr';

	const renderItem = React.useCallback(
		({ name, style }) => <span style={style}>{name}</span>,
		[],
	);

	return (
		<Grid alignment="bottom" templateColumns={templateColumns}>
			{withSelect && (
				<FormGroup label={label}>
					<SelectDropdown
						disabled={disabled}
						onChange={onChange}
						options={options}
						ref={forwardedRef}
						renderItem={renderItem}
						size={size}
						value={value}
						{...otherProps}
					/>
				</FormGroup>
			)}
			<Grid
				alignment="bottom"
				templateColumns={subControlsTemplateColumns}
			>
				{withNumberInput && (
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
				)}
				<View>
					<Button
						disabled={value === undefined}
						isBlock
						onClick={onReset}
					>
						{__('Reset')}
					</Button>
				</View>
			</Grid>
		</Grid>
	);
}

export default contextConnect(FontSizeControlSelect, 'FontSizeControlSelect');
