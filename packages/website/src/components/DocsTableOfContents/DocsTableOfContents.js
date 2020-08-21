import "./DocsTableOfContents.css"

import { Spacer, Subheading, View } from "@wp-g2/components"
import { Link } from "gatsby"
import React from "react"

export function DocsTableOfContents({ headings = [] }) {
  if (!headings.length) return null

  return (
    <View className="DocsTableOfContentsWrapper">
      <Spacer>
        <Subheading variant="muted">Contents</Subheading>
      </Spacer>
      <View className="DocsTableOfContents">
        <TableOfContents headings={headings} />
      </View>
    </View>
  )
}

function TableOfContents({ currentId, headings = [] }) {
  return (
    <ul>
      {headings
        .filter(heading => heading.depth !== 1)
        .map(heading => (
          <li key={heading.title}>
            <Link
              aria-current={
                currentId === heading.url.replace("#", "") ? "page" : null
              }
              to={heading.url}
            >
              {heading.title}
            </Link>
            {heading.items && (
              <TableOfContents currentId={currentId} headings={heading.items} />
            )}
          </li>
        ))}
    </ul>
  )
}
