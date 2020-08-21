exports.onCreateBabelConfig = ({ actions }, pluginOptions) => {
	actions.setBabelPreset({
		name: require.resolve(`@wp-g2/babel-plugin-styles`),
		options: {
			autoLabel: process.env.NODE_ENV !== `production`,
			sourceMap: process.env.NODE_ENV !== `production`,
			...(pluginOptions ? pluginOptions : {}),
		},
	});
};
