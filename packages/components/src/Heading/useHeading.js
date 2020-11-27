import { useContextSystem } from '@wp-g2/context';
import { getHeadingFontSize, ui } from '@wp-g2/styles';

import { useText } from '../Text';

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'div'>} props
 */
export function useHeading(props) {
	const { size = 3, ...otherProps } = useContextSystem(props, 'Heading');

	const textProps = useText({
		color: ui.get('colorTextHeading'),
		size: getHeadingFontSize(size),
		isBlock: true,
		weight: ui.get('fontWeightHeading'),
		...otherProps,
	});

	return textProps;
}
