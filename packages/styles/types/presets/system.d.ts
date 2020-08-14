type CSSClassName = string;

declare interface FontStyles {
	/** Adds bold styling to the font. */
	bold: CSSClassName;
	/** Adds italics to the font. */
	italic: CSSClassName;
	/** Adjusts the font to enable all small capitals. */
	smallCaps: CSSClassName;
}

declare interface FontSizes {
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

declare interface FontMixins {
	/** Modifies the font to a size, based on system type scale. */
	size: FontSize;
}

declare interface FontInterface extends FontStyles, FontSizes, FontMixins {}

/** Core system style presets. */
export declare const system: {
	/** Modify font styles based on system presets. */
	font: FontInterface;
};
