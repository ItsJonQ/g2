import "./Docs.css"

import { Grid, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import React from "react"

import {
  DocsNavigation,
  DocsTableOfContents,
  Inspector,
  SEO,
  SiteFooter,
  SiteHeader,
} from "../components"
import BaseLayout from "./Base"

export default function Layout(props) {
  const { children, data } = props

  const title = data?.mdx?.frontmatter?.title
  const description = data?.mdx?.frontmatter?.description
  const headings = data?.mdx?.tableOfContents?.items[0]?.items

  const isMdx = !!data?.mdx

  return (
    <BaseLayout>
      <Inspector>
        <View className="LayoutsDocsWrapper" css={[ui.padding.x(5)]}>
          <SiteHeader />
          <SEO description={description} title={title} />
          <View
            className="LayoutsDocsWrapperPage"
            css={[ui.frame.width(1280), ui.alignment.center]}
          >
            <Grid
              className="LayoutsDocsWrapperContent"
              gap={10}
              templateColumns="220px minmax(0, 1fr) 160px"
            >
              <View as="aside" css={[ui.position.relative()]}>
                <DocsNavigation path={props.path} />
              </View>
              <View as="main">
                <View
                  as="article"
                  className="LayoutsDocs"
                  css={{ fontSize: "1rem" }}
                >
                  {isMdx ? (
                    <MDXRenderer>{data?.mdx?.body}</MDXRenderer>
                  ) : (
                    children
                  )}
                </View>
                <SiteFooter />
              </View>
              <View as="aside" css={[ui.position.relative()]}>
                <DocsTableOfContents headings={headings} />
              </View>
            </Grid>
          </View>
        </View>
      </Inspector>
    </BaseLayout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        description
      }
      body
      tableOfContents(maxDepth: 3)
    }
  }
`
