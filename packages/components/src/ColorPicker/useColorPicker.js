import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';

import * as styles from './ColorPicker.styles';
import { useColorPickerState } from './useColorPickerState';

export function useColorPicker(props) {
	const {
		color,
		alpha,
		onChange = noop,
		changeFormat = 'rgb',
		disableAlpha = true,
		width = '100%',
		...otherProps
	} = useContextSystem(props, 'ColorPicker');

	const colorState = useColorPickerState({
		color,
		onChange,
		changeFormat,
		disableAlpha,
	});
	const classes = cx(disableAlpha && styles.disableAlpha);

	return {
		...otherProps,
		...colorState,
		className: classes,
		width,
	};
}
