import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { Animated } from '../Animated';
import { Flex, FlexBlock } from '../Flex';
import { View } from '../View';
import * as styles from './Alert.styles';
import AlertCloseButton from './AlertCloseButton';
import AlertTitle from './AlertTitle';
const { AlertView } = styles;

function Alert(props, forwardedRef) {
	const {
		children,
		isDismissable: isDismissableProp = false,
		onDismiss,
		status = 'default',
		title,
		...otherProps
	} = useContextSystem(props, 'Alert');
	const __css = cx([styles[status]]);
	const isDismissable = isDismissableProp || !!onDismiss;

	return (
		<Animated auto>
			<AlertView {...otherProps} cx={__css} ref={forwardedRef}>
				<Flex align="flex-start">
					<FlexBlock>
						<AlertTitle title={title} />
						<View
							{...ui.$('AlertContent')}
							cx={[isDismissable && styles.contentWithDismiss]}
						>
							{children}
						</View>
					</FlexBlock>
					<AlertCloseButton
						isDismissable={isDismissable}
						onDismiss={onDismiss}
						status={status}
					/>
				</Flex>
			</AlertView>
		</Animated>
	);
}

export default contextConnect(Alert, 'Alert');
