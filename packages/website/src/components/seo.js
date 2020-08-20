import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

export function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site?.siteMetadata?.description

  const metaData = [
    {
      content: metaDescription,
      name: `description`,
    },
    {
      content: title,
      property: `og:title`,
    },
    {
      content: metaDescription,
      property: `og:description`,
    },
    {
      content: `website`,
      property: `og:type`,
    },
    {
      content: `summary`,
      name: `twitter:card`,
    },
    {
      content: site?.siteMetadata?.author,
      name: `twitter:creator`,
    },
    {
      content: title,
      name: `twitter:title`,
    },
    {
      content: metaDescription,
      name: `twitter:description`,
    },
  ]
    .concat(meta)
    .filter(Boolean)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={metaData}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
    />
  )
}
