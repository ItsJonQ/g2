import {
	ControlLabel,
	Grid,
	Panel,
	PanelBody,
	PanelHeader,
	SlotFillProvider,
	Spacer,
	Surface,
	Switch,
	TextInput,
	View,
} from '@wp-g2/components';
import { capitalize, is } from '@wp-g2/utils';
import React, { createContext, useContext } from 'react';

export default {
	title: 'BlockControls/Test',
};

const blockJson = {
	attributes: {
		autoplay: {
			attribute: 'autoplay',
			default: true,
			selector: 'video',
			source: 'attribute',
			type: 'boolean',
		},
		caption: {
			selector: 'figcaption',
			source: 'html',
			type: 'string',
		},
		controls: {
			attribute: 'controls',
			default: true,
			selector: 'video',
			source: 'attribute',
			type: 'boolean',
		},
		id: {
			type: 'number',
		},
		loop: {
			attribute: 'loop',
			selector: 'video',
			source: 'attribute',
			type: 'boolean',
		},
		muted: {
			attribute: 'muted',
			selector: 'video',
			source: 'attribute',
			type: 'boolean',
		},
		playsInline: {
			attribute: 'playsinline',
			selector: 'video',
			source: 'attribute',
			type: 'boolean',
		},
		poster: {
			attribute: 'poster',
			selector: 'video',
			source: 'attribute',
			type: 'string',
		},
		preload: {
			attribute: 'preload',
			default: 'metadata',
			selector: 'video',
			source: 'attribute',
			type: 'string',
		},
		src: {
			attribute: 'src',
			selector: 'video',
			source: 'attribute',
			type: 'string',
		},
	},
	category: 'media',
	name: 'core/video',
	supports: {
		align: true,
		anchor: true,
		lightBlockWrapper: true,
	},
};

const Controls = {
	boolean: ({ value, ...props }) => (
		<Switch defaultValue={value} {...props} />
	),
	string: TextInput,
};

const BlockContext = createContext({});
const useBlockContext = () => useContext(BlockContext);

const ControlGroup = ({ children, label }) => {
	return (
		<Spacer>
			<Grid templateColumns="1fr 2fr">
				<ControlLabel>{label}</ControlLabel>
				<View css={{ display: 'flex', justifyContent: 'flex-end' }}>
					{children}
				</View>
			</Grid>
		</Spacer>
	);
};

function useBlockControls({ title = 'Title', controls = [], visible = true }) {
	const { attributes } = useBlockContext();

	return (
		<Panel visible={visible}>
			<PanelHeader title={title} />
			<PanelBody>
				{controls.map((control) => {
					let currentControl = control;

					if (is.string(control)) {
						currentControl = attributes[control];
					}
					if (is.plainObject(control)) {
						currentControl = attributes[control.attribute];
						if (currentControl) {
							currentControl = {
								...currentControl,
								...control,
							};
						}
					}

					if (!currentControl) return null;

					const ControlComponent = Controls[currentControl.type];
					if (!ControlComponent) return null;

					const key = is.string(control)
						? control
						: currentControl.attribute;
					const label = currentControl.label || capitalize(key);

					return (
						<ControlGroup key={key} label={label}>
							<ControlComponent value={currentControl.default} />
						</ControlGroup>
					);
				})}
			</PanelBody>
		</Panel>
	);
}

const Example = () => {
	const VideoSettingsPanel = useBlockControls({
		controls: [
			'autoplay',
			'loop',
			'muted',
			{ attribute: 'playsInline', label: 'Inline' },
		],
		title: 'Video settings',
	});

	const MetaDataPanel = useBlockControls({
		controls: ['caption', { attribute: 'preload', default: undefined }],
		title: 'Meta data',
	});

	return (
		<>
			{VideoSettingsPanel}
			{MetaDataPanel}
		</>
	);
};

const Block = ({ children }) => {
	return (
		<BlockContext.Provider value={{ attributes: blockJson.attributes }}>
			{children}
		</BlockContext.Provider>
	);
};

export const _default = () => {
	return (
		<SlotFillProvider>
			<Block>
				<Surface
					border="1px solid"
					css={{ margin: 'auto', maxWidth: 300 }}
				>
					<Example />
				</Surface>
			</Block>
		</SlotFillProvider>
	);
};
