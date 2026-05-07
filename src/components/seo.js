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
  date,
  description = ``,
  image,
  lang = `en`,
  meta = [],
  pathname = `/`,
  tags = [],
  title,
  type = `website`,
}) {
  const data = useStaticQuery(graphql`
    {
      avatar: file(absolutePath: { regex: "/blog.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 600, height: 400, layout: FIXED)
        }
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
  const canonical = `${site.siteUrl}${pathname}`
  const imageUrl =
    image || `${site.siteUrl}${data.avatar.childImageSharp.gatsbyImageData.src}`
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
      {metaTags.map((entry) => {
        const key = entry.name || entry.property
        return <meta key={key} {...entry} />
      })}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}

Seo.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  pathname: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Seo
