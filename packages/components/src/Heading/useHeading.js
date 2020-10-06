import { useContextSystem } from '@wp-g2/context';
import { css, cx, get } from '@wp-g2/styles';

import { useText } from '../Text';

export function useHeading(props) {
	const { className, size = 3, ...otherProps } = useContextSystem(
		props,
		'Heading',
	);

	const classes = cx(css({ color: get('colorTextHeading') }), className);

	const textProps = useText({
		className: classes,
		size: get(`fontSizeH${size}`),
		isBlock: true,
		weight: 600,
		...otherProps,
	});

	return textProps;
}
