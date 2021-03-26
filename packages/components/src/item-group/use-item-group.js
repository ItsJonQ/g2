/**
 * External dependencies
 */
import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

/**
 * Internal dependencies
 */
import * as styles from './styles';

export function useItemGroup(props) {
	const {
		bordered = false,
		className,
		role = 'list',
		rounded = true,
		separated = false,
		...otherProps
	} = useContextSystem(props, 'ItemGroup');

	const classes = cx(
		bordered && styles.bordered,
		(bordered || separated) && styles.separated,
		rounded && styles.rounded,
		className,
	);

	return {
		bordered,
		className: classes,
		role,
		separated,
		...otherProps,
	};
}
