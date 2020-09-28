import { useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';

import { useControlGroupContext } from '../ControlGroup';
import { useFlex } from '../Flex';
import * as styles from './BaseButton.styles';

export function useBaseButton(props) {
	const {
		children,
		className,
		css: cssProp,
		currentColor,
		disabled = false,
		elevation = 0,
		elevationActive,
		elevationFocus,
		elevationHover,
		gap = 2,
		hasCaret = false,
		href,
		icon,
		iconSize = 16,
		isBlock = false,
		isControl = false,
		isDestructive = false,
		isLoading = false,
		isNarrow = false,
		isRounded = false,
		isSubtle = false,
		justify = 'center',
		noWrap = true,
		prefix,
		size = 'medium',
		suffix,
		textAlign = 'center',
		variant,
		...otherProps
	} = useContextSystem(props, 'BaseButton');

	const { className: flexClassName, ...flexProps } = useFlex({
		gap,
		justify,
	});

	const as = href ? 'a' : 'button';
	const { styles: controlGroupStyles } = useControlGroupContext();
	const isIconOnly = !!icon && !children;

	const classes = cx([
		flexClassName,
		styles.Button,
		isBlock && styles.block,
		isDestructive && styles.destructive,
		styles[variant],
		styles[size],
		isIconOnly && styles.icon,
		isSubtle && styles.subtle,
		isControl && styles.control,
		isSubtle && isControl && styles.subtleControl,
		controlGroupStyles,
		isRounded && styles.rounded,
		isNarrow && styles.narrow,
		currentColor && styles.currentColor,
		css({ textAlign }),
		css(cssProp),
		className,
	]);

	return {
		...flexProps,
		as,
		href,
		children,
		disabled,
		elevation,
		className: classes,
		elevationActive,
		elevationFocus,
		elevationHover,
		hasCaret,
		icon,
		prefix,
		suffix,
		iconSize,
		isLoading,
		noWrap,
		...otherProps,
	};
}
