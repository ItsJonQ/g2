import { HStack, Link, Spacer, Text, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import React from "react"

function NavLink(props) {
  return (
    <Link
      css={[ui.padding.y(5), ui.padding.x(2)]}
      rel="noopener"
      target="_blank"
      weight="bold"
      {...props}
    />
  )
}

export function SiteFooter() {
  return (
    <Spacer as="footer" className="SiteFooter" mb={0} mt={5} py={10}>
      <HStack>
        <Text className="SiteFooterText" variant="muted">
          © {new Date().getFullYear()}. <strong>G2 Components</strong>.
        </Text>
        <View>
          <HStack as="nav">
            <NavLink href="https://g2components.wordpress.com/">Blog</NavLink>
            <NavLink href="https://github.com/itsjonq/g2">Github</NavLink>
            <NavLink href="https://g2-components.xyz/">Storybook</NavLink>
          </HStack>
        </View>
      </HStack>
    </Spacer>
  )
}
