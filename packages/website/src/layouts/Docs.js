import "./Docs.css"

import { Grid, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import React from "react"

import { DocsNavigation, Footer, Header, SEO } from "../components"

const Layout = ({ children, ...props }) => {
  const title = props?.pageContext?.frontmatter?.title

  return (
    <View css={[ui.padding.x(5)]}>
      <Header />
      <SEO title={title} />
      <View css={[ui.frame.width(1080), ui.alignment.center]}>
        <Grid gap={48} templateColumns="240px minmax(0, 1fr)">
          <View css={[ui.position.relative]}>
            <DocsNavigation />
          </View>
          <View>
            <View as="main" className="LayoutsDocs" css={{ fontSize: "1rem" }}>
              {children}
            </View>
            <Footer />
          </View>
        </Grid>
      </View>
    </View>
  )
}

export default Layout
