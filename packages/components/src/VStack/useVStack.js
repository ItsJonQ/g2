import { useContextSystem } from '@wp-g2/context';

import { useHStack } from '../HStack';

export function useVStack(props) {
	const { expanded = false, ...otherProps } = useContextSystem(
		props,
		'VStack',
	);

	const hStackProps = useHStack({
		direction: 'column',
		expanded,
		...otherProps,
	});

	return hStackProps;
}
