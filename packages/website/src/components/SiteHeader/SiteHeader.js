import "./SiteHeader.css"

import {
  Elevation,
  Heading,
  HStack,
  Link,
  Surface,
  View,
} from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import { Link as GLink } from "gatsby"
import React from "react"

import { Logo } from "../Logo"

function NavLink(props) {
  return (
    <Link
      className="SiteHeaderLink"
      css={[ui.padding.y(5), ui.padding.x(2)]}
      target="_blank"
      weight="bold"
      {...props}
    />
  )
}

export function SiteHeader() {
  return (
    <Surface
      className="SiteHeader"
      css={{
        left: 0,
        padding: 20,
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <View
        className="SiteHeaderContent"
        css={[ui.frame.width(1080), ui.alignment.center]}
      >
        <HStack className="SiteHeaderLinkWrapper">
          <GLink to="/">
            <Heading className="SiteHeaderLogo" size={4}>
              <span style={{ paddingRight: 8, verticalAlign: "middle" }}>
                <Logo />
              </span>
              G2 Components
            </Heading>
          </GLink>
          <HStack as="nav" className="SiteHeaderSideLinks">
            <NavLink href="https://g2components.wordpress.com/">Blog</NavLink>
            <NavLink href="https://github.com/itsjonq/g2">Github</NavLink>
            <NavLink href="https://g2-components.xyz/">Storybook</NavLink>
          </HStack>
        </HStack>
      </View>
      <Elevation className="SiteHeaderShadow" value={2} />
    </Surface>
  )
}
