// Small helpers around the `figure` values returned by the queries.

type FigureLike = { asset?: { _ref: string } | null; alt?: string | null } | null | undefined

// Asset reference for <NuxtImg provider="sanity">; empty when the image is not set
export function imageRef(image: FigureLike) {
  return image?.asset?._ref || ''
}

export function hasImage(image: FigureLike): image is { asset: { _ref: string }; alt?: string | null } {
  return Boolean(image?.asset?._ref)
}
