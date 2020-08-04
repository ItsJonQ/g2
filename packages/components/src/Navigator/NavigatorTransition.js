import { connect } from '@wp-g2/context';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { useNavigatorContext } from './Navigator.Context';
import * as styles from './Navigator.styles';
import { NavigatorTransitionWrapperView } from './Navigator.styles';
import { useHistory } from './Navigator.utils';

function NavigatorTransition({ children, forwardedRef, ...props }) {
	const { animationDuration } = useNavigatorContext();
	const history = useHistory();

	const isForward = history?.action === 'PUSH';

	const cx = [
		isForward ? styles.forward : styles.backward,
		isForward ? styles.forwardExit : styles.backwardExit,
		isForward ? styles.forwardZIndex : styles.backwardZIndex,
	];

	return (
		<NavigatorTransitionWrapperView cx={cx} ref={forwardedRef}>
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
