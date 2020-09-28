import { useContextSystem } from '@wp-g2/context';

import { useText } from '../Text';

export function useSubheading(props) {
	const { size = 10, ...otherProps } = useContextSystem(props, 'Subheading');

	const textProps = useText({
		size,
		variant: 'muted',
		isBlock: true,
		weight: 600,
		upperCase: true,
		...otherProps,
	});

	return textProps;
}
