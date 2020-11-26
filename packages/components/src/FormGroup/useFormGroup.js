import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useUniqueId } from '@wp-g2/utils';

import * as styles from './FormGroup.styles';

/**
 * @typedef OwnProps
 * @property {Pick<import('../Text/types').Props, 'align'>} [alignLabel='left']
 * @property {boolean} [horizontal=true]
 * @property {string} [label]
 * @property {string} [help]
 * @property {boolean} [labelHidden=false]
 * @property {boolean} [truncate=false]
 */

/** @typedef {import('../Grid/types').Props & OwnProps} Props */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'div'>} props
 */
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
