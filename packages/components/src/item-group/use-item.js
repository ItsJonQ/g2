import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import { useItemGroupContext } from './context';
import * as styles from './styles';

export function useItem(props) {
	const {
		action = false,
		as: asProp,
		className,
		role = 'listitem',
		size: sizeProp,
		...otherProps
	} = useContextSystem(props, 'Item');

	const { size: contextSize, spacedAround } = useItemGroupContext();

	const size = sizeProp || contextSize;

	const as = asProp || action ? 'button' : 'div';

	const classes = cx(
		action && styles.unstyledButton,
		styles.itemSizes[size] || styles.itemSizes.medium,
		styles.item,
		spacedAround && styles.spacedAround,
		className,
	);

	return {
		as,
		className: classes,
		role,
		...otherProps,
	};
}
