import "./Docs.css"

import { Grid, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import React from "react"

import { DocsNavigation, SEO, SiteFooter, SiteHeader } from "../components"

const Layout = ({ children, ...props }) => {
  const title = props?.pageContext?.frontmatter?.title
  const description = props?.pageContext?.frontmatter?.description
  console.log(props)
  return (
    <View className="LayoutsDocsWrapper">
      <SiteHeader />
      <SEO description={description} title={title} />
      <View
        className="LayoutsDocsWrapperPage"
        css={[ui.frame.width(1080), ui.alignment.center]}
      >
        <Grid
          className="LayoutsDocsWrapperContent"
          gap={48}
          templateColumns="240px minmax(0, 1fr)"
        >
          <View css={[ui.position.relative]}>
            <DocsNavigation />
          </View>
          <View>
            <View as="main" className="LayoutsDocs" css={{ fontSize: "1rem" }}>
              {children}
            </View>
            <SiteFooter />
          </View>
        </Grid>
      </View>
    </View>
  )
}

export default Layout
