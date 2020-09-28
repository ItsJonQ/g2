import { useContextSystem } from '@wp-g2/context';

import { useFlexItem } from './useFlexItem';

export function useFlexBlock(props) {
	const otherProps = useContextSystem(props, 'FlexBlock');
	const flexItemProps = useFlexItem({ isBlock: true, ...otherProps });

	return flexItemProps;
}
