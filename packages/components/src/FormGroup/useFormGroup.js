import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useUniqueId } from '@wp-g2/utils';

import * as styles from './FormGroup.styles';

export function useFormGroup(props) {
	const {
		alignLabel = 'left',
		children,
		className,
		help,
		horizontal = false,
		id: idProp,
		label,
		labelHidden = false,
		truncate = false,
		...otherProps
	} = useContextSystem(props, 'FormGroup');

	const id = useUniqueId(useFormGroup, 'form-group', idProp);

	const classes = cx(styles.FormGroup, className);

	const contentProps = {
		alignLabel,
		children,
		help,
		id,
		horizontal,
		label,
		labelHidden,
		truncate,
	};

	return {
		...otherProps,
		className: classes,
		contentProps,
		horizontal,
	};
}
