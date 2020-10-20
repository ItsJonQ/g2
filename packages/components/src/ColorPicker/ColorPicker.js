import { contextConnect } from '@wp-g2/context';
import { css } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { ColorPickerContext } from './ColorPicker.Context';
import * as styles from './ColorPicker.styles';
import { ColorPickerElement } from './ColorPickerElement';
import { ColorPickerInputs } from './ColorPickerInputs';
import { ColorPickerSelect } from './ColorPickerSelect';
import { useColorPicker } from './useColorPicker';

const { ColorPickerView } = styles;

function ColorPicker(props, forwardedRef) {
	const { onChange, store, width, ...otherProps } = useColorPicker(props);

	const contextProps = React.useMemo(() => ({ store }), [store]);

	return (
		<ColorPickerContext.Provider value={contextProps}>
			<VStack alignment="top" cx={css({ width })} isExpanded={false}>
				<ColorPickerView {...otherProps} ref={forwardedRef}>
					<ColorPickerElement onChange={onChange} width={width} />
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
