import "./DocsTableOfContents.css"

import { Link } from "gatsby"
import React from "react"

export function DocsTableOfContents({ headings = [] }) {
  return (
    <div className="DocsTableOfContents">
      <TableOfContents headings={headings} />
    </div>
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
