import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useMemo } from 'react';

import { useSurface } from '../Surface';
import * as styles from './Card.styles';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').CardProps, 'div'>} props
 */
export function useCard(props) {
	const {
		className,
		elevation = 2,
		isBorderless = false,
		isRounded = true,
		...otherProps
	} = useContextSystem(props, 'Card');

	const classes = useMemo(() => {
		return cx(
			styles.Card,
			isBorderless && styles.borderless,
			isRounded && styles.rounded,
			className,
		);
	}, [className, isBorderless, isRounded]);

	const surfaceProps = useSurface({ ...otherProps, className: classes });

	return {
		...surfaceProps,
		elevation,
		isRounded,
	};
}
