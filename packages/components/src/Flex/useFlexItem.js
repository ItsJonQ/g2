import { useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';

import * as styles from './Flex.styles';

/**
 * @typedef FlexItemProps
 * @property {import('react').CSSProperties['display']} display
 * @property {boolean} [isBlock=false]
 */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<FlexItemProps, 'div'>} props
 */
export function useFlexItem(props) {
	const {
		className,
		display: displayProp,
		isBlock = false,
		...otherProps
	} = useContextSystem(props, 'FlexItem');
	const sx = {};

	sx.Base = css({
		display: displayProp || ui.get('FlexItemDisplay'),
		// marginBottom: ui.get('FlexItemMarginBottom'),
		// marginLeft: ui.get('FlexItemMarginLeft'),
		// marginRight: ui.get('FlexItemMarginRight'),
	});

	const classes = cx(
		styles.Item,
		sx.Base,
		isBlock && styles.block,
		className,
	);

	return {
		...otherProps,
		className: classes,
	};
}
