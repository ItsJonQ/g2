import {
  Menu,
  MenuItem,
  Scrollable,
  Subheading,
  Text,
  View,
  VStack,
} from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import { Link } from "gatsby"
import { kebabCase } from "lodash"
import React, { useEffect, useRef } from "react"

import componentLinks from "../../data/navigation-components.json"
import contextLinks from "../../data/navigation-context.json"
import styleLinks from "../../data/navigation-styles.json"

function getNavigationLinks(path) {
  switch (true) {
    case path.includes("/components"):
      return componentLinks
    case path.includes("/context"):
      return contextLinks
    case path.includes("/styles"):
      return styleLinks
    default:
      return { sections: [] }
  }
}

function Links({ links }) {
  if (!links) return null

  return (
    <Menu>
      {links.map(link => (
        <MenuItem as={Link} key={link.title} to={link.link}>
          {link.title}
        </MenuItem>
      ))}
    </Menu>
  )
}

function SubSection({ sections: sectionsProp }) {
  if (!sectionsProp || !Array.isArray(sectionsProp)) return null
  const sections = sectionsProp.filter(Boolean)

  return (
    <VStack spacing={4}>
      {sections.map((section, index) => (
        <View key={section.title}>
          <Section isSubSection {...section} index={index} />
        </View>
      ))}
    </VStack>
  )
}

function Section({ index = 0, isSubSection, links, sections, title }) {
  const TitleComponent = isSubSection ? Subheading : Text
  const id = `nav-${kebabCase(title)}-${index}`

  return (
    <VStack
      aria-labelledby={id}
      as="section"
      css={[ui.margin.bottom(isSubSection ? 0 : 4)]}
      role="navigation"
      spacing={2}
    >
      <View as="header">
        <TitleComponent
          as="h2"
          id={id}
          size={!isSubSection ? 14 : 10}
          weight="bold"
        >
          {title}
        </TitleComponent>
      </View>

      <Links links={links} />
      <SubSection sections={sections} />
    </VStack>
  )
}

export function DocsNavigation({ path }) {
  const links = getNavigationLinks(path)
  const sections = links.sections.filter(Boolean)
  const scrollableRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      const node = scrollableRef?.current
      if (!node) return

      const activeLink = node.querySelector('[aria-current="page"]')
      if (activeLink && activeLink.scrollIntoViewIfNeeded) {
        activeLink.scrollIntoViewIfNeeded()
      }
    }, 100)
  }, [])

  return (
    <View css={[ui.position.sticky, { top: 100 }, { marginTop: 20 }]}>
      <Scrollable
        css={[ui.frame.height("70vh"), ui.padding.right(3)]}
        ref={scrollableRef}
      >
        {sections.map((section, index) => (
          <Section key={section.title} {...section} index={index} />
        ))}
      </Scrollable>
    </View>
  )
}
