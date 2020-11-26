import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useMemo } from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { useFlex } from '../Flex';
import * as styles from './BaseField.styles';

/**
 * @typedef OwnProps
 * @property {boolean} [error=false] Renders an error.
 * @property {boolean} [disabled] Whether the field is disabled.
 * @property {boolean} [isClickable=false] Renders a `cursor: pointer` on hover.
 * @property {boolean} [isFocused=false] Renders focus styles.
 * @property {boolean} [isInline=false] Renders as an inline element (layout).
 * @property {boolean} [isSubtle=false] Renders a subtle variant.
 */

/** @typedef {import('../Flex/useFlex').FlexProps & OwnProps} Props */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'div'>} props
 */
export function useBaseField(props) {
	const {
		className,
		defaultValue, // extract this because useFlex doesn't accept it
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
