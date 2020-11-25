import { useContextSystem } from '@wp-g2/context';

import { useFlexItem } from './useFlexItem';

/**
 * @typedef {Omit<import('./useFlexItem').Props, 'isBlock'>} FlexBlockProps
 */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<FlexBlockProps, 'div'>} props
 */
export function useFlexBlock(props) {
	const otherProps = useContextSystem(props, 'FlexBlock');
	const flexItemProps = useFlexItem({ isBlock: true, ...otherProps });

	return flexItemProps;
}
