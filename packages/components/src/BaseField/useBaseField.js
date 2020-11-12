import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useMemo } from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { useFlex } from '../Flex';
import * as styles from './BaseField.styles';

export function useBaseField(props) {
	const {
		className,
		error = false,
		isClickable = false,
		isFocused = false,
		isInline = false,
		isSubtle = false,
		...otherProps
	} = useContextSystem(props, 'BaseField');

	const { styles: controlGroupStyles } = useControlGroupContext();

	const classes = useMemo(
		() =>
			cx(
				styles.BaseField,
				controlGroupStyles,
				isClickable && styles.clickable,
				isFocused && styles.focus,
				isSubtle && styles.subtle,
				error && styles.error,
				error && isFocused && styles.errorFocus,
				isInline && styles.inline,
				className,
			),
		[
			className,
			controlGroupStyles,
			error,
			isInline,
			isClickable,
			isFocused,
			isSubtle,
		],
	);

	const flexProps = useFlex({ ...otherProps, className: classes });

	return flexProps;
}
