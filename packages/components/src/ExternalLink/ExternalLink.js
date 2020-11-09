import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiExternalLink } from '@wp-g2/icons';
import React from 'react';

import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import * as styles from './ExternalLink.styles';

function ExternalLink(props, forwardedRef) {
	const { children, href, rel, ...otherProps } = useContextSystem(
		props,
		'ExternalLink',
	);

	return (
		<a
			href={href}
			ref={forwardedRef}
			rel={rel}
			// eslint-disable-next-line react/jsx-no-target-blank
			target="_blank"
			{...otherProps}
		>
			<VisuallyHidden>(opens in a new tab)</VisuallyHidden>
			{children}
			<Icon
				className={styles.Icon}
				icon={<FiExternalLink />}
				inline
				size="15"
			/>
		</a>
	);
}

export default contextConnect(ExternalLink, 'ExternalLink');
