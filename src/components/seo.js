/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

function Seo({
  canonicalPath,
  date,
  description = ``,
  image,
  lang = `en`,
  meta = [],
  markdownPath,
  noindex = false,
  pathname = `/`,
  tags = [],
  title,
  type = `website`,
}) {
  const data = useStaticQuery(graphql`
    {
      avatar: file(absolutePath: { regex: "/blog.jpg/" }) {
        publicURL
      }
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  const site = data.site.siteMetadata
  const metaDescription = description || site.description
  const canonical = `${site.siteUrl}${canonicalPath || pathname}`
  const imageUrl = image || `${site.siteUrl}${data.avatar.publicURL}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "WebSite",
    headline: title,
    description: metaDescription,
    url: canonical,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: site.author,
      url: site.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: site.author,
    },
    ...(date ? { datePublished: date, dateModified: date } : {}),
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
  }

  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    ...(noindex
      ? [
          {
            name: `robots`,
            content: `noindex, follow`,
          },
        ]
      : []),
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: type,
    },
    {
      property: `og:url`,
      content: canonical,
    },
    {
      property: `og:image`,
      content: imageUrl,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: site.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ].concat(meta)

  return (
    <>
      <html lang={lang} />
      <title>{`${title} | ${site.title}`}</title>
      <link rel="canonical" href={canonical} />
      {markdownPath && (
        <link rel="alternate" type="text/markdown" href={markdownPath} />
      )}
      {metaTags.map((entry) => {
        const key = entry.name || entry.property
        return <meta key={key} {...entry} />
      })}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}

Seo.propTypes = {
  canonicalPath: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  markdownPath: PropTypes.string,
  noindex: PropTypes.bool,
  pathname: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Seo
