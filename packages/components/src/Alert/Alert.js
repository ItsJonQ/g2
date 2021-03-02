import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import React from 'react';

import { Flex, FlexBlock } from '../Flex';
import { View } from '../View';
import * as styles from './Alert.styles';
import AlertCloseButton from './AlertCloseButton';
import AlertTitle from './AlertTitle';
const { AlertView } = styles;

function Alert(props, forwardedRef) {
	const {
		children,
		className,
		isDismissable: isDismissableProp = false,
		onDismiss,
		status = 'default',
		title,
		...otherProps
	} = useContextSystem(props, 'Alert');
	const isDismissable = isDismissableProp || !!onDismiss;
	const classes = cx(styles[status], className);
	const viewClasses = cx([isDismissable && styles.contentWithDismiss]);

	return (
		<AlertView {...otherProps} className={classes} ref={forwardedRef}>
			<Flex align="flex-start">
				<FlexBlock>
					<AlertTitle title={title} />
					<View {...ui.$('AlertContent')} className={viewClasses}>
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
	);
}

export default contextConnect(Alert, 'Alert');
