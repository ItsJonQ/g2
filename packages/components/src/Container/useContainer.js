import { useContextSystem } from '@wp-g2/context';
import { css, cx, useResponsiveValue } from '@wp-g2/styles';

import * as styles from './Container.styles';

export function useContainer(props) {
	const {
		alignment = 'center',
		className,
		width = 1280,
		...otherProps
	} = useContextSystem(props, 'Container');

	const maxWidth = useResponsiveValue(width);
	const classes = cx(
		css({ maxWidth, width: '100%' }),
		styles[alignment],
		className,
	);

	return {
		...otherProps,
		className: classes,
	};
}
