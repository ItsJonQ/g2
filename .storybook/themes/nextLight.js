import { createTheme } from '@wp-g2/styles';
import next from './next';

const theme = createTheme(({ get, theme }) => {
	return {
		...next,
		controlBorderColor: '#a5a5a5',
		controlBorderColorHover: get('controlBorderColor'),
	};
});

export default theme;
