import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import { useText } from '../Text';
import * as styles from './Link.styles';

/**
 * @typedef OwnProps
 * @property {boolean} [isPlain]
 */

/** @typedef {OwnProps & import('../Text/types').Props} Props */

/**
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'a'>} props
 */
export function useLink(props) {
	const { className, isPlain, ...otherProps } = useContextSystem(
		props,
		'Link',
	);

	const textProps = useText(otherProps);

	const classes = cx(
		textProps.className,
		[styles.BaseLink, !isPlain && styles.Link],
		className,
	);

	return {
		...textProps,
		className: classes,
	};
}
