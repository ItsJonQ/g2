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

export function Header() {
  return (
    <Surface
      css={{
        left: 0,
        padding: 20,
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <View css={[ui.frame.width(1080), ui.alignment.center]}>
        <HStack>
          <GLink to="/">
            <Heading size={4}>G2 Components</Heading>
          </GLink>
          <HStack>
            <Link
              css={[ui.padding.y(5), ui.padding.x(2)]}
              href="https://g2components.wordpress.com/"
              target="_blank"
              weight="bold"
            >
              Blog
            </Link>
            <Link
              css={[ui.padding.y(5), ui.padding.x(2)]}
              href="https://github.com/itsjonq/g2"
              target="_blank"
              weight="bold"
            >
              Github
            </Link>
            <Link
              css={[ui.padding.y(5), ui.padding.x(2)]}
              href="https://g2-components.xyz/"
              target="_blank"
              weight="bold"
            >
              Storybook
            </Link>
          </HStack>
        </HStack>
      </View>
      <Elevation value={2} />
    </Surface>
  )
}
