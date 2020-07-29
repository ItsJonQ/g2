import { connect } from '@wp-g2/provider';
import { useControlledState } from '@wp-g2/utils';
import React from 'react';

import { CardBody } from '../Card';
import { ColorPicker } from '../ColorPicker';
import { ColorSwatch } from '../ColorSwatch';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import * as styles from './ColorField.styles';
const { ColorPickerButtonView } = styles;

function ColorField({ color: colorProp, maxWidth = 280, placement, ...props }) {
	const [color, setColor] = useControlledState(colorProp, {
		fallback: 'purple',
	});

	return (
		<Popover placement={placement}>
			<PopoverTrigger as={ColorPickerButtonView} {...props}>
				<ColorSwatch color={color} />
			</PopoverTrigger>
			<PopoverContent maxWidth={maxWidth}>
				<CardBody>
					<ColorPicker color={color} onChange={setColor} />
				</CardBody>
			</PopoverContent>
		</Popover>
	);
}

export default connect(ColorField);
