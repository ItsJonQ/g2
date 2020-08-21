module.exports = {
  plugins: [
    `@wp-g2/gatsby-plugin-styles`,
    `gatsby-plugin-react-helmet`,
    {
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [`gatsby-remark-autolink-headers`],
      },
      resolve: `gatsby-plugin-mdx`,
    },
    {
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      options: {
        background_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/g2-logo.png`,
        name: `g2-components`,
        short_name: `g2`,
        start_url: `/`,
        theme_color: `#000000`, // This path is relative to the root of the site.
      },
      resolve: `gatsby-plugin-manifest`,
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  siteMetadata: {
    author: `@itsjonq`,
    description: `The project is a from-scratch reimagining of @wordpress/components to accommodate the ever-growing and ever-expressive needs of the Editor and the platform.`,
    title: `G2 Components`,
  },
}
