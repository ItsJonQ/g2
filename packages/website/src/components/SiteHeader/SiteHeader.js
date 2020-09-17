import {
  Elevation,
  FormGroup,
  Grid,
  HStack,
  Icon,
  Link,
  Spacer,
  Surface,
  Switch,
  Tooltip,
  View,
} from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import { Link as GLink } from "gatsby"
import React from "react"

import { useAppContext } from "../AppProvider"
import { Logo } from "../Logo"
import { SiteSearch } from "../SiteSearch"

function NavLink(props) {
  return (
    <Link
      as={GLink}
      css={[ui.padding.y(5), ui.padding.x(2)]}
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
      css={{
        left: 0,
        padding: "8px 20px",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <View css={[ui.frame.width(1280), ui.alignment.center]}>
        <HStack>
          <Grid as="nav" templateColumns="100px minmax(0, 1fr)">
            <GLink aria-label="G2 Components" role="banner" to="/">
              <Icon icon={<Logo />} size={32} />
            </GLink>
            <HStack spacing={3}>
              <NavLink to="/styles/">Styles</NavLink>
              <NavLink to="/components/">Components</NavLink>
              <NavLink to="/context/">Context</NavLink>
            </HStack>
          </Grid>
          <Spacer />
          <HStack>
            <FormGroup label="Inspect" templateColumns="1fr 1fr">
              <Tooltip
                content="See how this site was built with G2!"
                gutter={16}
                placement="bottom"
              >
                <Switch checked={inspect} onChange={toggleInspect} />
              </Tooltip>
            </FormGroup>
            <SiteSearch />
          </HStack>
        </HStack>
      </View>
      <Elevation value={2} />
    </Surface>
  )
}
