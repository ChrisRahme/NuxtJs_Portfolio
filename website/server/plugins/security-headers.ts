import { createHash } from 'node:crypto'

const STATIC_HEADERS = {
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'cross-origin-opener-policy': 'same-origin',
}

function inlineScriptHashes(html: string) {
  const hashes = new Set<string>()
  for (const [, attributes = '', body = ''] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    // External scripts load by URL, and JSON data blocks never run
    if (!body || /\bsrc\s*=/i.test(attributes) || /\btype\s*=\s*["']?application\/(ld\+)?json/i.test(attributes)) {
      continue
    }

    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  }

  return [...hashes]
}

function contentSecurityPolicy(scriptHashes: string[], sanityProjectId: string) {
  const sanityApi = sanityProjectId ? `https://${sanityProjectId}.apicdn.sanity.io` : 'https://*.apicdn.sanity.io'

  const csp = [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(' ')}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://cdn.sanity.io",
    "media-src 'self' https://cdn.sanity.io",
    "font-src 'self'",
    `connect-src 'self' ${sanityApi} https://api.iconify.design`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ]

  return csp.join('; ')
}

export default defineNitroPlugin(function (nitroApp) {
  const config = useRuntimeConfig()
  const sanityProjectId = String(config['public']?.['sanity']?.['projectId'] || '')

  nitroApp.hooks.hook('render:response', function (response) {
    const headers = (response.headers ||= {}) as Record<string, string>
    delete headers['x-powered-by']

    const isHtml = typeof response.body === 'string' && String(headers['content-type'] || '').includes('text/html')
    if (!isHtml) {
      return
    }

    Object.assign(headers, STATIC_HEADERS)
    if (!import.meta.dev) {
      headers['content-security-policy'] = contentSecurityPolicy(inlineScriptHashes(response.body as string), sanityProjectId)
    }
  })
})
