import { space } from '../mixins/space';
import { css } from '../style-system';

export function margin(value) {
	return css({ margin: space(value) });
}

margin.x = (v) => css({ marginLeft: space(v), marginRight: space(v) });
margin.y = (v) => css({ marginBottom: space(v), marginTop: space(v) });
margin.top = (v) => css({ marginTop: space(v) });
margin.bottom = (v) => css({ marginBottom: space(v) });
margin.left = (v) => css({ marginLeft: space(v) });
margin.right = (v) => css({ marginRight: space(v) });

export function padding(value) {
	return css({ padding: space(value) });
}

padding.x = (v) => css({ paddingLeft: space(v), paddingRight: space(v) });
padding.y = (v) => css({ paddingBottom: space(v), paddingTop: space(v) });
padding.top = (v) => css({ paddingTop: space(v) });
padding.bottom = (v) => css({ paddingBottom: space(v) });
padding.left = (v) => css({ paddingLeft: space(v) });
padding.right = (v) => css({ paddingRight: space(v) });
