import {
  Elevation,
  FormGroup,
  Heading,
  HStack,
  Link,
  Spacer,
  Surface,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  View,
} from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import { Link as GLink } from "gatsby"
import React from "react"

import { useAppContext } from "../AppProvider"
import { Logo } from "../Logo"

function NavLink(props) {
  return (
    <Link
      className="SiteHeaderLink"
      css={[ui.padding.y(5), ui.padding.x(2)]}
      rel="noopener"
      target="_blank"
      weight="bold"
      {...props}
    />
  )
}

export function SiteHeader() {
  const { inspect, toggleInspect } = useAppContext()

  return (
    <Surface
      as="header"
      className="SiteHeader"
      css={{
        left: 0,
        padding: "8px 20px",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <View
        className="SiteHeaderContent"
        css={[ui.frame.width(1280), ui.alignment.center]}
      >
        <HStack className="SiteHeaderLinkWrapper">
          <GLink role="banner" to="/">
            <Heading className="SiteHeaderLogo" size={4}>
              <View
                as="span"
                css={{ paddingRight: 8, verticalAlign: "middle" }}
              >
                <Logo />
              </View>
              G2 Components
            </Heading>
          </GLink>
          <HStack as="nav" className="SiteHeaderSideLinks">
            <NavLink href="https://g2components.wordpress.com/">Blog</NavLink>
            <NavLink href="https://github.com/itsjonq/g2">Github</NavLink>
            <NavLink href="https://g2-components.xyz/">Storybook</NavLink>
            <Spacer />
            <FormGroup isMarginless label="Inspect">
              <Tooltip placement="bottom-end">
                <TooltipTrigger>
                  <Switch checked={inspect} onChange={toggleInspect} />
                </TooltipTrigger>
                <TooltipContent>
                  See how this site was built with G2!
                </TooltipContent>
              </Tooltip>
            </FormGroup>
          </HStack>
        </HStack>
      </View>
      <Elevation className="SiteHeaderShadow" value={2} />
    </Surface>
  )
}
