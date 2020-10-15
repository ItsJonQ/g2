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
	dropCap: false,
	setState: (next) => set(next),
}));

export const useTypography = typographyStore;

export const typographyOptionKeys = {
	fontFamily: {
		label: 'Font Family',
		value: 'Inter',
	},
	fontSize: {
		label: 'Font Size',
		value: '13px',
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
	dropCap: {
		label: 'Drop Cap',
		value: false,
	},
};

export const Preview = React.memo(() => {
	const {
		dropCap,
		fontFamily,
		fontSize,
		fontWeight,
		letterSpacing,
		lineHeight,
	} = useTypography();

	let dropCapStyles;

	if (dropCap) {
		dropCapStyles = ui.css`
			&:first-child:first-letter {
				color: #903;
				float: left;
				font-size: 5em;
				line-height: 0.5;
				padding-top: 4px;
				padding-right: 8px;
				padding-left: 3px;
			}
		`;
	}
	return (
		<ListGroup>
			<ListGroupHeader>Preview</ListGroupHeader>
			<View css={{ padding: ui.space(5) }}>
				<View css={dropCapStyles}>
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
			</View>
		</ListGroup>
	);
});