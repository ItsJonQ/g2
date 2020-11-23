import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, get } from '@wp-g2/styles';
import { ui } from '@wp-g2/styles';
import React, { useState } from 'react';

import { Image } from '../Image';
import { Initials } from '../Initials';
import { View } from '../View';
import { AvatarView } from './Avatar.styles';
import * as styles from './Avatar.styles';
import { getBorderRadius, getInitialsTextSize, getSize } from './Avatar.utils';

function Avatar(props, forwardedRef) {
	const {
		animateOnImageLoad = true,
		border = false,
		color = get('lightGray500'),
		name,
		shape = 'circle',
		size: sizeProp = 'medium',
		src,
		className,
		...otherProps
	} = useContextSystem(props, 'Avatar');

	const [imageLoaded, setImageLoaded] = useState(!animateOnImageLoad);
	const size = getSize(sizeProp);
	const borderRadius = getBorderRadius(shape, size);
	const textSize = getInitialsTextSize(size);

	const shouldRenderInitials = !!name;

	// Gracefully fades the Avatar image in
	const handleOnImageLoad = () => setImageLoaded(true);

	const sx = {};

	sx.base = css({
		background: color,
		width: size,
		height: size,
	});

	sx.borderRadius = css({
		borderRadius,
	});

	const classes = cx(
		sx.base,
		sx.borderRadius,
		border && styles.border,
		className,
	);

	return (
		<AvatarView {...otherProps} className={classes} ref={forwardedRef}>
			{shouldRenderInitials && (
				<View css={css([ui.position.absolute, ui.alignment.center])}>
					<Initials
						{...ui.$('AvatarInitials')}
						align="center"
						as="div"
						lineHeight={1}
						name={name}
						optimizeReadabilityFor={color}
						size={textSize}
					/>
				</View>
			)}
			{src && (
				<Image
					{...ui.$('AvatarImage')}
					alt={name}
					aspectRatio={1}
					css={css([
						{
							borderRadius,
							// Prevents image clipping from revealing background colour
							transform: 'scale(1.025)',
						},
						ui.opacity(imageLoaded ? 1 : 0),
						ui.animation.default,
					])}
					onLoad={handleOnImageLoad}
					src={src}
				/>
			)}
		</AvatarView>
	);
}

export default contextConnect(Avatar, 'Avatar');
