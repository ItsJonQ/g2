import { useContextSystem } from '@wp-g2/context';
import { get } from '@wp-g2/styles';

import { useText } from '../Text';

export function useHeading(props) {
	const { size = 3, ...otherProps } = useContextSystem(props, 'Heading');

	const textProps = useText({
		size: get(`fontSizeH${size}`),
		isBlock: true,
		weight: 600,
		...otherProps,
	});

	return textProps;
}
