// URL-safe id from a name: lowercase, runs of non-alphanumerics collapsed to single dashes.
// The Studio import used the same rule for the project slugs and the ?role= company ids.
export function slugify(text: string | null | undefined) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
