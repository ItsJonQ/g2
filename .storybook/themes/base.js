import { createTheme } from '@wp-g2/styles';
import { pick } from '@wp-g2/utils';
import next from './next';

const theme = createTheme(({ theme }) => {
	return pick(theme, Object.keys(next));
});

export default theme;
