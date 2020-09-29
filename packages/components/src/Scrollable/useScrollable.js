import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import * as styles from './Scrollable.styles';

export function useScrollable(props) {
	const { className, smoothScroll = false, ...otherProps } = useContextSystem(
		props,
		'Scrollable',
	);

	const classes = cx(
		styles.Scrollable,
		styles.scrollableScrollbar,
		smoothScroll && styles.smoothScroll,
		className,
	);

	return {
		...otherProps,
		className: classes,
	};
}
