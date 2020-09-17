import {
  CardBody,
  CardHeader,
  Heading,
  Popover,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@wp-g2/components"
import { styled, ui } from "@wp-g2/styles"
import { is } from "@wp-g2/utils"
import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useEffect, useRef, useState } from "react"

import { SyntaxHighlighter } from "./SyntaxHighlighter"

const CodeWrapperView = styled.span`
  &:hover {
    cursor: pointer;
    code {
      background: ${ui.get("yellow300")};
    }
  }
`

export function DefinitionPopover({ children }) {
  const data = useComponentData(children)
  let currentPage = false
  const [canRender, setCanRender] = useState(true)
  const nodeRef = useRef()

  useEffect(() => {
    const node = nodeRef.current
    const closestLink = node?.closest("a")
    if (closestLink) {
      setCanRender(false)
    }
  }, [])

  // For SSR
  if (typeof window !== "undefined") {
    currentPage = window?.location?.pathname
  }

  const isCurrentPage = currentPage && currentPage.includes(data?.fields?.slug)

  if (!data || !is.string(children) || isCurrentPage || !canRender) {
    return <code ref={nodeRef}>{children}</code>
  }

  const { fields, frontmatter } = data
  const { description, title } = frontmatter
  const { slug, snippet } = fields

  return (
    <>
      <Popover
        placement="bottom-start"
        preventBodyScroll={false}
        tabIndex={0}
        trigger={
          <CodeWrapperView>
            <code ref={nodeRef}>{children}</code>
          </CodeWrapperView>
        }
      >
        <CardHeader size="small">
          <Heading size={5}>{title}</Heading>
          <Text weight="bold">
            <Link to={slug}>View Docs</Link>
          </Text>
        </CardHeader>
        <Tabs>
          <TabList>
            <Tab size="small">Description</Tab>
            {snippet && <Tab size="small">Code</Tab>}
          </TabList>
          <TabPanel>
            <CardBody>
              <Text>{description}</Text>
            </CardBody>
          </TabPanel>
          {snippet && (
            <TabPanel>
              <CardBody
                css={`
                  pre.prism-code {
                    margin: 0;
                    overflow-x: auto;
                  }
                `}
              >
                <SyntaxHighlighter code={snippet} copy lang="jsx" />
              </CardBody>
            </TabPanel>
          )}
        </Tabs>
      </Popover>
    </>
  )
}

function useComponentsData() {
  const data = useStaticQuery(
    graphql`
      query {
        allMdx {
          edges {
            node {
              id
              frontmatter {
                title
                type
                description
              }
              fields {
                id
                slug
                snippet
              }
              slug
            }
          }
        }
      }
    `
  )

  if (data) {
    return data.allMdx.edges.map(edge => edge.node)
  }

  return []
}

function useComponentData(match = "") {
  const data = useComponentsData()

  return data.find(item => {
    return item?.fields?.slug === `/components/${match?.toLowerCase()}/`
  })
}
