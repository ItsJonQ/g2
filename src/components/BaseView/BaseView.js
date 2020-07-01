import { Box } from 'theme-ui';
import { withTheme } from '../../styled';

const BaseView = withTheme(Box);

BaseView.defaultProps = {
	__css: {
		fontFamily: 'body',
		fontSize: 2,
	},
};

export default BaseView;
