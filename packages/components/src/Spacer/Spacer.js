import React from 'react';
import { BaseView } from '../BaseView';

export function Spacer({ mb = 2, ...props }) {
	return <BaseView mb={mb} {...props} />;
}
