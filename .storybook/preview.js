import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider, ui, config as stylesConfig } from '@wp-g2/styles';
import {
	Button,
	Card,
	CardBody,
	ControlLabel,
	FormGroup as BaseFormGroup,
	Flex,
	Popover,
	Surface,
	Switch,
	Select,
	ComponentInspector,
	ComponentDesignTool,
	View,
	Text,
} from '@wp-g2/components';
import { Hint } from '@wp-g2/hint';
import { useLocalState } from '@wp-g2/utils';
import { StatsGraph } from '@helpscout/stats';
import * as themes from './themes';

const __EXPERIMENTAL_SHOW_HINT = true;

const FormGroup = ({ children, ...props }) => {
	return (
		<BaseFormGroup templateColumns="1fr 1fr" {...props}>
			{children}
		</BaseFormGroup>
	);
};

const ColorInput = ({ value, onChange, fallback = '' }) => {
	return (
		<input
			type="color"
			value={value || fallback}
			onChange={(e) => onChange(e.target.value)}
			style={{ marginLeft: 'auto' }}
		/>
	);
};

const defaultThemeConfig = {
	colorAdmin: stylesConfig.colorAdmin,
	surfaceColor: stylesConfig.surfaceColor,
	cardBorderRadius: stylesConfig.cardBorderRadius,
	controlSurfaceColor: null,
	colorText: null,
	controlBorderRadius: stylesConfig.controlBorderRadius,
	controlHeight: stylesConfig.controlHeight,
	fontFamily: '',
	fontSize: stylesConfig.fontSize,
};

const Themer = React.memo(
	({
		inspector,
		setInspector,
		designTools,
		setDesignTools,
		stats,
		setStats,
	}) => {
		const [currentTheme, setCurrentTheme] = useLocalState(
			'g2/currentTheme/v0.0.94',
			'base',
		);

		const [isDark, setIsDark] = useLocalState('darkMode', false);
		const [isHighContrast, setIsHighContast] = useLocalState(
			'highContrastMode',
			false,
		);
		const [isColorBlind, setIsColorBlind] = useLocalState(
			'colorBlindMode',
			false,
		);
		const [isReducedMotion, setIsReducedMotion] = useLocalState(
			'reducedMotionMode',
			false,
		);

		const theme = themes[currentTheme] || {};

		return (
			<View
				css={[
					{
						position: 'fixed',
						left: 8,
						bottom: 8,
					},
					ui.zIndex('PreviewThemer', 10),
				]}
			>
				<ThemeProvider
					isDark={isDark}
					isGlobal
					isHighContrast={isHighContrast}
					isColorBlind={isColorBlind}
					isReducedMotion={isReducedMotion}
					theme={theme}
				/>
				<View css={{ padding: 8 }}>
					<Card css={{ display: 'inline-flex' }}>
						<CardBody css={{ padding: 4 }}>
							<Flex justify="left" gap={2}>
								<Select
									prefix={
										<Text
											variant="muted"
											isBlock
											css={ui.padding.left(2)}
										>
											Theme:
										</Text>
									}
									value={currentTheme}
									onChange={setCurrentTheme}
								>
									<optgroup label="Gutenberg">
										<option value="base" label="Base" />
										<option value="next" label="Next" />
									</optgroup>
									<optgroup label="Experimental">
										<option
											value="baseCompact"
											label="Base (Compact)"
										/>
										<option
											value="blueberry"
											label="Blueberry"
										/>
										<option
											value="blueberrySubtle"
											label="Blueberry (Subtle)"
										/>
										<option
											value="calypso"
											label="Calypso"
										/>
										<option
											value="cupertino"
											label="Cupertino"
										/>
									</optgroup>
								</Select>
								<Popover
									maxWidth={200}
									hideOnClickOutside={false}
									placement="top-start"
									trigger={
										<Button variant="tertiary">
											Configure
										</Button>
									}
								>
									<CardBody>
										<FormGroup>
											<ControlLabel>
												Dark Mode
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isDark}
													onChange={setIsDark}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												High Contrast
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isHighContrast}
													onChange={setIsHighContast}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Color Blind
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isColorBlind}
													onChange={setIsColorBlind}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Reduced Motion
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isReducedMotion}
													onChange={
														setIsReducedMotion
													}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Inspector
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!inspector}
													onChange={setInspector}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Design Tools
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!designTools}
													onChange={setDesignTools}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Stats (FPS)
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!stats}
													onChange={setStats}
												/>
											</Flex>
										</FormGroup>
									</CardBody>
								</Popover>
							</Flex>
						</CardBody>
					</Card>
				</View>
			</View>
		);
	},
);

function StoryDecorator(storyFn) {
	const [inspector, setInspector] = useLocalState('inspector', false);
	const [designTools, setDesignTools] = useLocalState('designTools', false);
	const [stats, setStats] = useLocalState('stats', false);

	const themerProps = {
		stats,
		setStats,
		designTools,
		setDesignTools,
		inspector,
		setInspector,
	};

	return (
		<>
			<Themer {...themerProps} />
			<View css={{ padding: 16 }}>
				{designTools && <ComponentDesignTool />}
				{stats && <StatsGraph />}
				<ComponentInspector
					visible={inspector}
					tooltipOnly
					tooltipElement={window}
				>
					{storyFn()}
				</ComponentInspector>
			</View>
			{__EXPERIMENTAL_SHOW_HINT && <Hint />}
			<Surface
				variant="tertiary"
				css={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1,
				}}
			/>
		</>
	);
}

addDecorator(StoryDecorator);
