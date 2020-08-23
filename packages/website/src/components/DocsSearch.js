import { MenuItem as ReakitMenuItem, useMenuState } from "@wp-g2/a11y"
import {
  Heading,
  Icon,
  MenuItem,
  Spacer,
  Surface,
  Text,
  TextField,
  View,
  VStack,
} from "@wp-g2/components"
import { FiSearch } from "@wp-g2/icons"
import { ui } from "@wp-g2/styles"
import { copyToClipboard } from "@wp-g2/utils"
import Fuse from "fuse.js"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { uniqBy } from "lodash"
import pluralize from "pluralize"
import queryString from "query-string"
import React, { useEffect, useRef, useState } from "react"

export function DocsSearch({ visible }) {
  const options = {
    distance: 200,
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "rawBody",
        weight: 0.3,
      },
    ],
    minMatchCharLength: 1,
    threshold: 0.3,
  }
  const nodeRef = useRef()
  const inputRef = useRef()
  const data = useComponentsData()
  const [queryParam, setQueryParam] = useQueryParam()
  const [query, setQuery] = useState(queryParam)
  const fuse = useRef(new Fuse(data, options)).current

  const queryValue = query || ""
  const results = uniqBy(fuse.search(queryValue) || [])
  const hasResults = !!results.length

  useEffect(() => {
    if (visible && inputRef?.current) {
      inputRef.current.focus()
    }
    if (!visible) {
      setQueryParam("")
      setQuery("")
    }
  }, [setQueryParam, visible])

  const handleOnChange = next => {
    setQueryParam(next)
    setQuery(next)
  }

  const handleOnKeyDown = event => {
    // Tab press || Down arrow
    if ((event.keyCode === 9 || event.keyCode === 40) && !event.shiftKey) {
      event.preventDefault()
      // Focus on menu item
      const menuItem = nodeRef?.current?.querySelector('[role="menuitem"]')
      if (menuItem) {
        menuItem.focus()
      }
    }

    // Enter press
    if (event.keyCode === 13) {
      // Click on menu item
      const menuItem = nodeRef?.current?.querySelector('[role="menuitem"]')
      if (menuItem) {
        menuItem.click()
      }
    }
  }

  return (
    <View ref={nodeRef}>
      <Surface
        borderBottom
        css={{
          marginBottom: -12,
          marginTop: -12,
          paddingBottom: 12,
          paddingTop: 12,
          position: "sticky",
          top: -12,
          zIndex: 3,
        }}
      >
        <TextField
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          placeholder="Search... (e.g. hstack)"
          prefix={<Icon icon={<FiSearch />} size={12} />}
          ref={inputRef}
          size="large"
          style={{ position: "sticky", top: 0 }}
          type="search"
          value={queryValue}
        />
      </Surface>
      <ResultsHeader query={query} results={results} />
      {hasResults && <SearchResults results={results} />}
    </View>
  )
}

function ResultsHeader({ results = [], query = "" }) {
  if (!query) return null
  const count = results.length
  const label = pluralize("result", count)

  return (
    <View>
      <Spacer mb={4} pt={8}>
        <Text>
          Found {count} {label} for "<strong>{query}</strong>"
        </Text>
      </Spacer>
    </View>
  )
}

function ResultItem({ description, menu, slug, snippet, title }) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false)
      }, 200)

      return () => clearTimeout(id)
    }
  }, [hasCopied])

  const dragSnippetData = event => {
    if (snippet) {
      event.dataTransfer.setData("text/plain", snippet)
    }
  }

  const copySnippetData = event => {
    if (snippet) {
      event.preventDefault()
      copyToClipboard(snippet)
      const didCopy = copyToClipboard(snippet)
      setHasCopied(didCopy)
    }
  }

  const handleOnKeyDown = event => {
    const { ctrlKey, keyCode, metaKey } = event
    // Copy command
    if (keyCode === 67 && (ctrlKey || metaKey)) {
      return copySnippetData(event)
    }
  }

  return (
    <ReakitMenuItem
      as={MenuItem}
      {...menu}
      draggable
      onClick={() => navigate(slug)}
      onDragStart={dragSnippetData}
      onKeyDown={handleOnKeyDown}
      title={`${title}. Copy or drag/drop for code snippet.`}
    >
      <VStack
        css={[
          ui.scale(hasCopied ? 0.98 : 1),
          ui.opacity(hasCopied ? 0.4 : 1),
          ui.animation.duration(0.16),
          ui.animation.bounce,
        ]}
        spacing={1}
      >
        <Heading size={4}>{title}</Heading>
        <Text variant="muted">{description}</Text>
      </VStack>
    </ReakitMenuItem>
  )
}

function SearchResults({ results = [] }) {
  const menu = useMenuState({ visible: true })

  return (
    <VStack>
      {results.map(result => (
        <ResultItem key={result.item.id} {...result.item} menu={menu} />
      ))}
    </VStack>
  )
}

const useSearchParams = () => {
  const inBrowser = typeof document !== "undefined"
  const initialParam = inBrowser
    ? queryString.parse(document.location.search)
    : {}
  const [searchParams] = useState(initialParam)

  const setSearchParams = next => {
    if (inBrowser) {
      const nextQuery = next
        ? `?${queryString.stringify({ s: next })}`
        : document.location.pathname

      // For SSR
      if (typeof window !== "undefined") {
        window.history.replaceState({}, null, nextQuery)
      }
    }
  }

  return [searchParams, setSearchParams]
}

export const useQueryParam = (key = "s", defaultState = "") => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams[key]
    ? searchParams[key]
    : defaultState
    ? defaultState
    : null

  return [query, setSearchParams]
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
                title
                snippet
              }
              rawBody
              slug
            }
          }
        }
      }
    `
  )

  if (data) {
    const enhancedData = data.allMdx.edges.map(edge => {
      const { node } = edge
      return { ...node, ...node.fields, ...node.frontmatter }
    })

    return enhancedData
      .filter(item => item?.slug.includes("/components/"))
      .filter(item => item.description)
  }

  return []
}
