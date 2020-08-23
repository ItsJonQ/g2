/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { lstatSync, readdirSync } = require("fs")
const { get } = require("lodash")
const { getDataFromFile } = require("./scripts/get-post-data.js")

const basePath = path.resolve(__dirname, "../../", "packages")
const packages = readdirSync(basePath).filter(name =>
  lstatSync(path.join(basePath, name)).isDirectory()
)

const createSlug = ({ filePath, node }) => {
  const preferredSlug = get(node, "frontmatter.slug", filePath)

  return preferredSlug
}

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

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const LayoutsDocs = path.resolve(`./src/layouts/Docs.js`)
  const result = await graphql(
    `
      {
        allMdx(limit: 1000) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              fields {
                title
                description
                template
                slug
              }
              frontmatter {
                title
              }
              body
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const { node } = post

    createPage({
      component: LayoutsDocs,
      context: {
        ...node.fields,
        id: node.id,
        slug: node.fields.slug,
      },
      path: node.fields.slug,
    })
  })
}

exports.onCreateNode = async ({ actions, getNode, node }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const { fileAbsolutePath } = node

    const filePath = createFilePath({ getNode, node })
    const slug = createSlug({ filePath, node })
    const fileData = await getDataFromFile(fileAbsolutePath)

    if (fileData) {
      createNodeField({
        name: "snippet",
        node,
        value: fileData.snippet,
      })

      createNodeField({
        name: "keywords",
        node,
        value: fileData.keywords,
      })

      createNodeField({
        name: "baseType",
        node,
        value: fileData.type,
      })
    }

    createNodeField({
      name: "id",
      node,
      value: node.id,
    })

    createNodeField({
      name: "title",
      node,
      value: get(node, "frontmatter.title", ""),
    })

    createNodeField({
      name: "description",
      node,
      value: get(node, "frontmatter.description", ""),
    })

    createNodeField({
      name: "keywords",
      node,
      value: get(node, "frontmatter.keywords", []),
    })

    createNodeField({
      name: "template",
      node,
      value: get(node, "frontmatter.template", "docs"),
    })

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}
