/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { lstatSync, readdirSync } = require("fs")

const basePath = path.resolve(__dirname, "../../", "packages")
const packages = readdirSync(basePath).filter(name =>
  lstatSync(path.join(basePath, name)).isDirectory()
)

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        ...packages.reduce(
          (acc, name) => ({
            ...acc,
            [`@wp-g2/${name}`]: path.join(basePath, name, "src"),
          }),
          {}
        ),
      },
    },
  })
}
