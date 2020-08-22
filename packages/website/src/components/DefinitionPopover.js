import {
  CardBody,
  CardHeader,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@wp-g2/components"
import { get, styled } from "@wp-g2/styles"
import { is } from "@wp-g2/utils"
import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

const CodeWrapperView = styled.span`
  &:hover {
    cursor: pointer;
    code {
      background: ${get("yellow300")};
    }
  }
`

export function DefinitionPopover({ children }) {
  const data = useComponentData(children)
  let currentPage = false

  // For SSR
  if (typeof window !== "undefined") {
    currentPage = window?.location?.pathname
  }

  const isCurrentPage = currentPage && currentPage.includes(data?.fields?.slug)

  if (!data || !is.string(children) || isCurrentPage) {
    return <code>{children}</code>
  }

  const { fields, frontmatter } = data

  return (
    <>
      <Popover placement="top-start">
        <PopoverTrigger as={CodeWrapperView}>
          <code>{children}</code>
        </PopoverTrigger>
        <PopoverContent preventBodyScroll={false} tabIndex={0}>
          <CardHeader size="small">
            <Heading size={5}>{frontmatter.title}</Heading>
            <Text weight="bold">
              <Link to={fields.slug}>View Docs</Link>
            </Text>
          </CardHeader>
          <CardBody>
            <Text>{frontmatter.description}</Text>
          </CardBody>
        </PopoverContent>
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
