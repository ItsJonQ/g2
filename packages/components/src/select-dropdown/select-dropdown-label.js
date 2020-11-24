import { ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';

function SelectDropdownLabel(props) {
	const { hideLabelFromVision, ...otherProps } = props;
	const Component = hideLabelFromVision ? VisuallyHidden : View;

	return <Component {...otherProps} {...ui.$('SelectDropdownLabel')} />;
}

export default SelectDropdownLabel;
