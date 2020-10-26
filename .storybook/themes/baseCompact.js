import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, theme, space }) => {
	return {
		...theme,
		controlBorderColor: get('surfaceBorderColor'),
		controlBorderColorHover: get('surfaceBorderColor'),
		controlBorderColorSubtle: 'transparent',
		controlHeight: '28px',
		fontSize: '12px',
		panelHeaderPadding: `${space(2.5)} ${space(3)}`,
		segmentedControlBackdropBorderColor: get('surfaceBorderColor'),
	};
});

export default theme;
