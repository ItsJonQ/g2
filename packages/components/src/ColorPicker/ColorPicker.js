import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { useSubState } from '@wp-g2/substate';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React, { useCallback, useEffect } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

import { Grid } from '../Grid';
import { Select } from '../Select';
import { TextInput } from '../TextInput';
import { VStack } from '../VStack';
import * as styles from './ColorPicker.styles';
const { ColorPickerView } = styles;

function ColorPicker(props, forwardedRef) {
	const {
		color: colorProp,
		alpha,
		onChange = noop,
		disableAlpha = true,
		width = '100%',
		...otherProps
	} = useContextSystem(props, 'ColorPicker');
	const initialColor = getInitialColor(colorProp, disableAlpha);
	const [color, setColor] = React.useState(initialColor);
	const store = useSubState((set) => ({
		color: getColor(colorProp, disableAlpha),
		setColor: (next) => set({ color: next }),
	}));

	// Work-around for controlling internal/external state for react-colorful
	const didIncomingChange = React.useRef(false);
	const currentColor = React.useRef(color);

	const { color: internalColor, setColor: setInternalColor } = store();

	useUpdateEffect(() => {
		const next = getColor(colorProp, disableAlpha);
		const current = getColor(currentColor.current, disableAlpha);

		if (next === current) {
			return;
		}

		didIncomingChange.current = true;
		store.setState(() => ({
			color: next,
		}));
		setColor(getInitialColor(colorProp));
		currentColor.current = getInitialColor(colorProp);
	}, [colorProp, disableAlpha]);

	const handleOnChange = useCallback(
		(next) => {
			const nextColor = getColor(next, disableAlpha);

			if (didIncomingChange.current) {
				didIncomingChange.current = false;
				return;
			}

			onChange(nextColor, { data: next });
			currentColor.current = nextColor;
			setInternalColor(nextColor);
		},
		[disableAlpha, onChange, setInternalColor],
	);

	const __css = cx(disableAlpha && styles.disableAlpha);

	return (
		<VStack cx={css({ width })}>
			<ColorPickerView {...otherProps} __css={__css} ref={forwardedRef}>
				<RgbaStringColorPicker
					color={color}
					onChange={handleOnChange}
					width={width}
				/>
			</ColorPickerView>
			<Grid>
				<Select>
					<option>Hex</option>
					<option>RGB</option>
					<option>HSL</option>
				</Select>
				<TextInput value={internalColor} />
			</Grid>
		</VStack>
	);
}

function getColor(color, disableAlpha) {
	return disableAlpha
		? ui.color(color).toHexString()
		: ui.color(color).toRgbString();
}

function getInitialColor(color) {
	return ui.color(color).toRgbString();
}

export default contextConnect(ColorPicker, 'ColorPicker');
