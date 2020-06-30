import { Box } from 'theme-ui';
import { baseTheme } from '../../utils';

const BaseView = Box;

BaseView.defaultProps = {
	theme: baseTheme,
	__css: {
		fontFamily: 'body',
		fontSize: 2,
	},
};

export default BaseView;
