import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import { useSurface } from '../Surface';
import * as styles from './Card.styles';

export function useCard(props) {
	const {
		className,
		elevation = 2,
		isBorderless = false,
		isRounded = true,
		...otherProps
	} = useContextSystem(props, 'Card');

	const classes = cx(
		styles.Card,
		isBorderless && styles.borderless,
		isRounded && styles.rounded,
		className,
	);

	const surfaceProps = useSurface({ ...otherProps, className: classes });

	return {
		...surfaceProps,
		elevation,
		isRounded,
	};
}
