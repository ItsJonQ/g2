import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

export function SEO({ description, lang = "en", meta = [], title }) {
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

  const metaTitle = title || site?.siteMetadata?.title
  const metaDescription = description || site?.siteMetadata?.description

  const metaData = [
    {
      content: metaDescription,
      name: `description`,
    },
    {
      content: metaTitle,
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
      content: metaTitle,
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
      title={metaTitle}
      titleTemplate={title ? `%s | ${site?.siteMetadata?.title}` : ""}
    />
  )
}
