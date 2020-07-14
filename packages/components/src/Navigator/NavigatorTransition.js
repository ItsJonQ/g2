import { connect } from '@wp-g2/provider';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { useHistory, useNavigatorContext } from './Navigator.utils';
import { NavigatorTransitionWrapperView } from './NavigatorTransition.styles';

function NavigatorTransition({ children, ...props }) {
	const { animationDuration } = useNavigatorContext();
	const history = useHistory();

	const isInitialRoute = history?.length === 1;
	const isForward = history?.action === 'PUSH';

	return (
		<NavigatorTransitionWrapperView
			animationDuration={animationDuration}
			isForward={isForward}
			isInitialRoute={isInitialRoute}
		>
			<CSSTransition
				classNames="fade"
				timeout={animationDuration}
				{...props}
			>
				{children}
			</CSSTransition>
		</NavigatorTransitionWrapperView>
	);
}

export default connect(NavigatorTransition);
