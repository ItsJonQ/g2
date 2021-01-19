import { contextConnect } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { ColorPickerContext } from './ColorPicker.Context';
import * as styles from './ColorPicker.styles';
import { ColorPickerElement } from './ColorPickerElement';
import { ColorPickerInputs } from './ColorPickerInputs';
import { ColorPickerSelect } from './ColorPickerSelect';
import { useColorPicker } from './useColorPicker';

const { ColorPickerView } = styles;

/**
 * @typedef {import('./useColorPicker').ColorPickerProps} Props
 */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function ColorPicker(props, forwardedRef) {
	const { className, store, width, ...otherProps } = useColorPicker(props);
	const contextProps = store;
	const { disableAlpha } = store;

	const classes = cx(disableAlpha && styles.disableAlpha, className);
	const vStackClasses = cx(css({ width }));

	return (
		<ColorPickerContext.Provider value={contextProps}>
			<VStack
				alignment="top"
				className={vStackClasses}
				isExpanded={false}
			>
				<ColorPickerView
					{...otherProps}
					className={classes}
					ref={forwardedRef}
				>
					<ColorPickerElement width={width} />
				</ColorPickerView>
				<VStack alignment="top" isExpanded={false}>
					<ColorPickerSelect />
					<ColorPickerInputs />
				</VStack>
			</VStack>
		</ColorPickerContext.Provider>
	);
}

export default contextConnect(ColorPicker, 'ColorPicker');
