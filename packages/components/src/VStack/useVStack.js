import { useContextSystem } from '@wp-g2/context';

import { useHStack } from '../HStack';

export function useVStack(props) {
	const otherProps = useContextSystem(props, 'VStack');
	const hStackProps = useHStack({ direction: 'column', ...otherProps });

	return hStackProps;
}
