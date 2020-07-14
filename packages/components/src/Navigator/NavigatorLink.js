import { connect } from '@wp-g2/provider';
import React from 'react';
import { Link } from 'react-router-dom';

function NavigatorLink({ children, forwardedRef, href, to, ...props }) {
	if (!to) {
		return (
			<a href={href || '#'} ref={forwardedRef} {...props}>
				{children}
			</a>
		);
	}

	return (
		<Link to={to} {...props} ref={forwardedRef}>
			{children}
		</Link>
	);
}

export default connect(NavigatorLink);
