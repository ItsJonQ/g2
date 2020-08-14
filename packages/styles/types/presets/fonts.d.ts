import { CSSClassName } from '../shared';

declare interface FontFamilyInterface {
	/** Modifies the font to the default font-family and weight. */
	default: CSSClassName;
	/** Modifies the font to the monospace font-family. */
	monospace: CSSClassName;
}

declare interface FontStyleInterface {
	/** Adds bold styling to the font. */
	bold: CSSClassName;
	/** Adds italics to the font. */
	italic: CSSClassName;
	/** Adjusts the font to enable all small capitals. */
	smallCaps: CSSClassName;
}

declare interface FontSizeInterface {
	/** A font with the default body text style. */
	body: CSSClassName;
	/** A font with the small caption text style. */
	caption: CSSClassName;
	/** A font with the small footnote text style. */
	footnote: CSSClassName;
	/** A font with the large title text style. */
	largeTitle: CSSClassName;
	/** A font with the title text style. */
	title: CSSClassName;
	/** A font with the headline text style. */
	headline: CSSClassName;
	/** A font with the subheadline text style. */
	subheadline: CSSClassName;
}

declare type FontSize = (size: number) => CSSClassName;

declare type FontColor = {
	/** Applies custom color to the font. */
	(color: string): CSSClassName;
	/** Applies black color to the font. */
	black: CSSClassName;
	/** Applies white color to the font. */
	white: CSSClassName;
	/** Applies red color to the font. */
	red: CSSClassName;
	/** Applies blue color to the font. */
	blue: CSSClassName;
	/** Applies green color to the font. */
	green: CSSClassName;
	/** Applies yellow color to the font. */
	yellow: CSSClassName;
	/** Applies orange color to the font. */
	orange: CSSClassName;
	/** Applies purple color to the font. */
	purple: CSSClassName;
	/** Applies lightGray color to the font. */
	lightGray: CSSClassName;
	/** Applies darkGray color to the font. */
	darkGray: CSSClassName;
	/** Applies admin color to the font. */
	admin: CSSClassName;
};

declare interface FontColorInterface {
	/** Applies custom color to the font. */
	color: FontColor;
}

declare interface FontMixinInterface {
	/** Modifies the font to a size, based on system type scale. */
	size: FontSize;
}

/** Modify font styles based on system presets. */
export declare interface FontInterface
	extends FontColorInterface,
		FontFamilyInterface,
		FontStyleInterface,
		FontSizeInterface,
		FontMixinInterface {}
