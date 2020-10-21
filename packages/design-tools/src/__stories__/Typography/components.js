import { StatsGraph } from '@helpscout/stats';
import {
	Card,
	CardBody,
	Container,
	Grid,
	ListGroup,
	ListGroupHeader,
	Surface,
	View,
} from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import { createStore } from '@wp-g2/substate';
import React from 'react';

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
		value: '1px',
	},
	dropCap: {
		label: 'Drop Cap',
		value: false,
	},
};

const createStateFromOptions = (options) => {
	return Object.entries(options).reduce((state, [k, v]) => {
		return { ...state, [k]: v.value };
	}, {});
};

export const dimensionsOptionKeys = {
	height: {
		label: 'Height',
		value: '120px',
	},
	padding: {
		label: 'Padding',
		value: '24px',
	},
};

export const colorOptionKeys = {
	backgroundColor: {
		label: 'Background',
		value: 'white',
	},
	textColor: {
		label: 'Text',
		value: 'black',
	},
};

const typographyState = createStateFromOptions(typographyOptionKeys);
const dimensionsState = createStateFromOptions(dimensionsOptionKeys);
const colorState = createStateFromOptions(colorOptionKeys);

const initialState = {
	...typographyState,
	...dimensionsState,
	...colorState,
};

export const typographyStore = createStore((set) => ({
	...initialState,
	setState: (next) => set(next),
	reset: (prop) => set({ [prop]: initialState[prop] }),
}));

export const colorPaletteStore = createStore(() => ({
	Black: '#000',
	White: '#fff',
	Gray: '#ccc',
	Blue: '#00f',
	Orange: '#0f5',
	Yellow: '#FFFF00',
}));

export const sidebarPanelStore = createStore((set) => ({
	overlay: false,
	toggleOverlay: () => set((prev) => ({ overlay: !prev.overlay })),
	on: () => set({ overlay: true }),
	off: () => set({ overlay: false }),
	set: (next) => set({ overlay: next }),
}));

export const useTypography = typographyStore;
export const useGlobalStyles = typographyStore;

export const presets = [
	{
		label: 'Small',
		key: 'small',
		value: '10px',
	},
	{
		label: 'Medium',
		key: 'medium',
		value: '16px',
	},
	{
		label: 'Large',
		key: 'large',
		value: '21px',
	},
];

export const fontFamilyPresets = [
	{
		label: 'Arial',
		key: 'arial',
		value: 'arial',
	},
	{
		label: 'Courier New',
		key: 'courier new',
		value: 'courier new',
	},
	{
		label: 'Inter',
		key: 'inter',
		value: 'inter',
	},
	{
		label: 'System',
		key: 'system',
		value: 'system-ui',
	},
];

const createPresetParser = ({ presets = [] }) => {
	const parse = (next) => {
		const presetItem = presets.find((i) => i?.label === next);
		return presetItem?.value || next;
	};

	const serialize = (next) => next;

	return {
		parse,
		serialize,
	};
};

export const fontSizeParser = createPresetParser({ presets });
export const fontFamilyParser = createPresetParser({
	presets: fontFamilyPresets,
});

export const Preview = React.memo(() => {
	const {
		backgroundColor,
		dropCap,
		fontFamily,
		fontSize,
		fontWeight,
		height,
		letterSpacing,
		lineHeight,
		padding,
		textColor,
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

	const fontFamilyValue = fontFamilyParser.parse(fontFamily);
	const fontSizeValue = fontSizeParser.parse(fontSize);

	return (
		<ListGroup>
			<ListGroupHeader>Preview</ListGroupHeader>
			<View css={{ padding: ui.space(5) }}>
				<View css={dropCapStyles}>
					<View
						style={{
							border: '1px solid rgba(100, 100, 100, 0.1)',
							backgroundColor,
							height,
							padding,
						}}
					>
						<div
							style={{
								fontSize: fontSizeValue,
								fontFamily: fontFamilyValue,
								fontWeight,
								letterSpacing: ui.value.px(letterSpacing),
								lineHeight,
								color: textColor,
							}}
						>
							Gutenberg
						</div>
					</View>
				</View>
			</View>
		</ListGroup>
	);
});

export const Wrapper = ({ children }) => {
	return (
		<>
			<StatsGraph />
			<Surface
				css={`
					position: fixed;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				`}
				variant="dotted"
			/>
			<Container width={800}>
				<Grid
					css={`
						margin-top: 5vh;
					`}
					templateColumns="minmax(0, 1fr) 265px"
				>
					<View>
						<Card>
							<CardBody>
								<Preview />
							</CardBody>
						</Card>
					</View>
					<View>{children}</View>
				</Grid>
				);
			</Container>
		</>
	);
};
