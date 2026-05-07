const normalizeTag = tag =>
  String(tag || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")

export const normalizeTags = tags => {
  if (!tags) return []
  const rawTags = Array.isArray(tags) ? tags : String(tags).split(/[,\s]+/)

  return Array.from(new Set(rawTags.map(normalizeTag).filter(Boolean)))
}

export const getPostDescription = node =>
  node.frontmatter.description || node.excerpt || ""

export const getPostTitle = node => node.frontmatter.title || node.fields.slug

export const getTopicSlug = tag => `/topics/${normalizeTag(tag)}/`
