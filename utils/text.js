// URL-safe id from a name: lowercase, runs of non-alphanumerics collapsed to single dashes
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
