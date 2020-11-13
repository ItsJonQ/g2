import {
	Grid,
	ListGroup,
	Panel,
	PanelBody,
	PanelHeader,
	Select,
	UnitInput,
} from '@wp-g2/components';
import React from 'react';
import {
	VscCaseSensitive,
	VscPreserveCase,
	VscSymbolKey,
} from 'react-icons/vsc';

import {
	CombinedFormGroup,
	CombinedFormGroupButtonGroup,
	CombinedFormGroupInputSlider,
	PanelWrapper,
	PresetControl,
	TypographyOptions,
} from './shared';

export default {
	title: 'DesignTools/Presentation/TypographyPanel',
};

export const _default = () => {
	return (
		<PanelWrapper title="Panels / Typography">
			<Panel collapsible={false}>
				<PanelHeader
					actions={<TypographyOptions />}
					title="Typography"
				/>
				<PanelBody>
					<ListGroup>
						<PresetControl />
						<CombinedFormGroup
							format="text"
							label="Font"
							prop="fontFamily"
						/>
						<CombinedFormGroupInputSlider
							Component={UnitInput}
							format="number"
							label="Size"
							min={0}
							prop="fontSize"
							sliderMax={100}
						/>
						<Grid>
							<CombinedFormGroup
								Component={Select}
								format="text"
								label="Appearance"
								prop="fontWeight"
							>
								<option value="Lighter">Light</option>
								<option value="Normal">Regular</option>
								<option value="Bold">Bold</option>
								<option value="Bolder">Bolder</option>
							</CombinedFormGroup>
							<CombinedFormGroup
								arrows="stepper"
								label="Line height"
								min={0}
								prop="lineHeight"
								step={0.1}
								type="number"
							/>
							<CombinedFormGroup
								arrows="stepper"
								label="Letter spacing"
								prop="letterSpacing"
								step={0.1}
								type="number"
							/>
							<CombinedFormGroupButtonGroup
								label="Letter case"
								options={[
									{
										value: 'uppercase',
										icon: <VscPreserveCase />,
									},
									{
										value: 'lowercase',
										icon: <VscSymbolKey />,
									},
									{
										value: 'capitalize',
										icon: <VscCaseSensitive />,
									},
								]}
								prop="letterCase"
							/>
						</Grid>
					</ListGroup>
				</PanelBody>
			</Panel>
		</PanelWrapper>
	);
};
