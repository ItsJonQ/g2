import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';

import * as styles from './Surface.styles';

export function useSurface(props) {
	const {
		backgroundSize = 16,
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
		className,
		variant = 'primary',
		...otherProps
	} = useContextSystem(props, 'Surface');

	const sx = {};

	sx.borders = styles.getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});

	const classes = cx(
		styles.Surface,
		sx.borders,
		styles[variant],
		css({
			backgroundSize: `${ui.value.px(backgroundSize)} ${ui.value.px(
				backgroundSize,
			)}`,
		}),
		className,
	);

	return {
		...otherProps,
		className: classes,
	};
}
