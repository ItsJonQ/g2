import {
	contextConnect,
	ContextSystemProvider,
	hasNamespace,
	useContextSystem,
} from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import * as linkStyles from '../Link/Link.styles';
import * as styles from './Navigator.styles';
import { NavLink, useHistory } from './Router';

function NavigatorLink(props, forwardedRef) {
	const {
		as,
		children,
		className,
		exact,
		href,
		isBack,
		isPlain,
		params,
		showArrow,
		to,
		...otherProps
	} = useContextSystem(props, 'NavigatorLink');

	const history = useHistory();
	const [child] = React.Children.toArray(children);
	const isWrappingMenuItem = hasNamespace(child, ['MenuItem']);

	const isLink = !!to || !!href;

	const classes = cx([
		linkStyles.BaseLink,
		!isPlain && linkStyles.Link,
		isWrappingMenuItem && styles.menuItemLink,
		className,
	]);

	const handleOnClick = (event) => {
		if (isBack) {
			event.preventDefault();
			if (to) {
				history.push(to, { isBack: true });
			} else {
				history.goBack();
			}
		}
	};

	const content = (
		<ContextSystemProvider
			value={{
				MenuItem: {
					isBack: isBack,
					showArrow: isLink || showArrow,
					tabIndex: -1,
				},
			}}
		>
			{children}
		</ContextSystemProvider>
	);

	if (!to) {
		return (
			<a
				href={href || '#'}
				ref={forwardedRef}
				{...otherProps}
				className={classes}
				onClick={handleOnClick}
			>
				{content}
			</a>
		);
	}

	return (
		<NavLink
			{...otherProps}
			activeClassName="is-active"
			className={classes}
			exact={exact}
			onClick={handleOnClick}
			ref={forwardedRef}
			to={to}
		>
			{content}
		</NavLink>
	);
}

export default contextConnect(NavigatorLink, 'NavigatorLink');
