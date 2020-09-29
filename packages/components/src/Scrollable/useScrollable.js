import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import * as styles from './Scrollable.styles';

export function useScrollable(props) {
	const {
		className,
		scrollDirection = 'y',
		smoothScroll = false,
		...otherProps
	} = useContextSystem(props, 'Scrollable');

	const classes = cx(
		styles.Scrollable,
		styles.scrollableScrollbar,
		smoothScroll && styles.smoothScroll,
		scrollDirection === 'x' && styles.scrollX,
		scrollDirection === 'y' && styles.scrollY,
		scrollDirection === 'auto' && styles.scrollAuto,
		className,
	);

	return {
		...otherProps,
		className: classes,
	};
}
