import { __ } from '@wordpress/i18n';
import { external } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { VisuallyHidden } from '../VisuallyHidden';
import * as styles from './ExternalLink.styles';

/**
 * @typedef {import('../Link').Props} Props
 */

/**
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<Props, 'a'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function ExternalLink(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(props, 'ExternalLink');

	return (
		<Link
			ref={forwardedRef}
			// eslint-disable-next-line react/jsx-no-target-blank
			target="_blank"
			{...otherProps}
		>
			<VisuallyHidden>{__('(opens in a new tab)')}</VisuallyHidden>
			{children}
			<Icon
				className={styles.Icon}
				fill="currentColor"
				icon={external}
				inline
				size="15"
			/>
		</Link>
	);
}

/** @type {import('@wp-g2/create-styles').PolymorphicComponent<'a', Props>} */
const ConnectedExternalLink = contextConnect(ExternalLink, 'ExternalLink');

export default ConnectedExternalLink;
