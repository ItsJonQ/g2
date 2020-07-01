import { Box as BaseBox } from 'theme-ui';
import { withTheme } from '../styled';

const Box = withTheme(BaseBox);

Box.defaultProps = {
	__css: {
		fontFamily: 'body',
		fontSize: 2,
	},
};

export default Box;
