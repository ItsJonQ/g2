import {
  Menu,
  MenuItem,
  Scrollable,
  Subheading,
  Text,
  View,
  VStack,
} from "@wp-g2/components"
import { cx, ui } from "@wp-g2/styles"
import { Link } from "gatsby"
import { kebabCase } from "lodash"
import React, { useEffect, useRef } from "react"

import data from "../../data/docs.json"

function Links({ links }) {
  if (!links) return null

  return (
    <Menu>
      {links.map(link => (
        <MenuItem
          as={Link}
          className="DocsNavigationMenuItem"
          key={link.title}
          to={link.link}
        >
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
    <VStack className="DocsNavigationSubSection" spacing={4}>
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
      className={cx("DocsNavigationSection", isSubSection && "is-subSection")}
      css={[ui.margin.bottom(isSubSection ? 0 : 4)]}
      role="navigation"
      spacing={2}
    >
      <View as="header">
        <TitleComponent
          as="h2"
          className={cx(
            "DocsNavigationSectionTitle",
            isSubSection && "is-subSection"
          )}
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

export function DocsNavigation() {
  const sections = data.sections.filter(Boolean)
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
    <View
      className="DocsNavigation"
      css={[ui.position.sticky, { top: 100 }, { marginTop: 20 }]}
    >
      <Scrollable
        className="DocsNavigationBody"
        css={[ui.frame.height("70vh"), ui.padding.right(3)]}
        ref={scrollableRef}
        smoothScroll
      >
        {sections.map((section, index) => (
          <Section key={section.title} {...section} index={index} />
        ))}
      </Scrollable>
    </View>
  )
}
