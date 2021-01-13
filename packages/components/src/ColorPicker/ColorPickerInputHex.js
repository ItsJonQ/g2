import { __ } from '@wordpress/i18n';
import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { FormGroup } from '../FormGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { useNumberKeyboardHandlers } from '../TextInput/useTextInputNumberState';
import { useBaseDragHandlers } from '../TextInput/useTextInputState.utils';
import { useColorPickerContext } from './ColorPicker.Context';

export const ColorInputHex = React.memo(
	({ label = __('Hex'), ...otherProps }) => {
		const { store } = useColorPickerContext();
		const [value, setValue, increment, decrement] = [
			store.hex(),
			store.change.hex,
			store.increment,
			store.decrement,
		];

		const dragHandlers = useBaseDragHandlers({
			increment,
			decrement,
			isTypeNumeric: true,
			dragAxis: 'y',
		});

		const keyboardHandlers = useNumberKeyboardHandlers({
			increment,
			decrement,
			stopIfEventDefaultPrevented: false,
		});

		const handleOnChange = React.useCallback(
			(next) => {
				setValue(ui.color(next).toHexString());
			},
			[setValue],
		);

		const handleOnValidate = React.useCallback((next) => {
			return ui.color(next).isValid();
		}, []);

		return (
			<FormGroup horizontal label={label}>
				<TextInput
					{...otherProps}
					{...dragHandlers}
					{...keyboardHandlers}
					onChange={handleOnChange}
					prefix={<Text variant="muted">#</Text>}
					validate={handleOnValidate}
					value={value}
				/>
			</FormGroup>
		);
	},
);
