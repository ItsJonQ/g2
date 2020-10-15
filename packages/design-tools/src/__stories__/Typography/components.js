import { ListGroup, ListGroupHeader, View } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import { createStore } from '@wp-g2/substate';
import React from 'react';

export const typographyStore = createStore((set) => ({
	fontFamily: 'Inter',
	fontWeight: 'Normal',
	fontSize: '13px',
	lineHeight: '1.5',
	letterSpacing: '1',
	setState: (next) => set(next),
}));

export const useTypography = typographyStore;

export const typographyOptionKeys = {
	fontSize: {
		label: 'Font Size',
		value: '13px',
	},
	fontFamily: {
		label: 'Font Family',
		value: 'Inter',
	},
	fontWeight: {
		label: 'Font Weight',
		value: 'Normal',
	},
	lineHeight: {
		label: 'Line Height',
		value: '1.5',
	},
	letterSpacing: {
		label: 'Letter Spacing',
		value: '1',
	},
};

export const Preview = React.memo(() => {
	const {
		fontFamily,
		fontSize,
		fontWeight,
		letterSpacing,
		lineHeight,
	} = useTypography();

	return (
		<ListGroup>
			<ListGroupHeader>Preview</ListGroupHeader>
			<View css={{ padding: ui.space(5) }}>
				<div
					style={{
						fontSize: ui.value.px(fontSize),
						fontFamily,
						fontWeight,
						letterSpacing: ui.value.px(letterSpacing),
						lineHeight,
					}}
				>
					Gutenberg
				</div>
			</View>
		</ListGroup>
	);
});
