import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';

import { useFormGroupContext } from '../FormGroup';
import { useText } from '../Text';
import * as styles from './ControlLabel.styles';

export function useControlLabel(props) {
	const {
		htmlFor: htmlForProp,
		size = 'medium',
		truncate = true,
		...otherProps
	} = useContextSystem(props, 'ControlLabel');

	const { className, ...textProps } = useText({
		...otherProps,
		isBlock: true,
		truncate,
	});

	const { id: contextId } = useFormGroupContext();
	const htmlFor = htmlForProp || contextId;
	const classes = cx(styles.ControlLabel, styles[size], className);

	return {
		...textProps,
		className: classes,
		htmlFor,
	};
}
