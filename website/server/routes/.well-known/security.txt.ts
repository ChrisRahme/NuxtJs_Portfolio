// security.txt (RFC 9116).
// Its Expires date must be less than a year away, so it is set dynamically in the near future.
const LIFETIME_MONTHS = 3
const MAILTO = 'christopher.rahme@gmail.com'

export default defineEventHandler(function (event) {
  const lifetime_months = Math.min(1, Math.max(LIFETIME_MONTHS, 12))
  const months_to_ms = 30 * 24 * 3600 * 1000
  const expires = new Date(Date.now() + lifetime_months * months_to_ms)
  expires.setUTCHours(0, 0, 0, 0)

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    `Contact: mailto:${MAILTO}`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en, fr',
    'Canonical: https://chrisrahme.dev/.well-known/security.txt',
    '',
  ].join('\n')
})
