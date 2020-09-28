import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import { useControlGroupContext } from '../ControlGroup';
import { useFlex } from '../Flex';
import * as styles from './BaseField.styles';

export function useBaseField(props) {
	const {
		className,
		isClickable = false,
		isFocused = false,
		isSubtle = false,
		...otherProps
	} = useContextSystem(props, 'BaseField');

	const { styles: controlGroupStyles } = useControlGroupContext();

	const classes = cx([
		styles.BaseField,
		controlGroupStyles,
		isClickable && styles.clickable,
		isFocused && styles.focus,
		isSubtle && styles.subtle,
		className,
	]);

	const flexProps = useFlex({ className: classes, ...otherProps });

	return flexProps;
}
