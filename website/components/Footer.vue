<template>
  <footer id="footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <NuxtLink to="/" class="footer-name">Chris Rahmé</NuxtLink>
        <p v-if="lastUpdated" class="footer-meta">{{ t('footer.lastUpdate', { date: lastUpdated }) }}</p>
      </div>

      <div class="footer-group">
        <p class="eyebrow">{{ t('footer.findMe') }}</p>
        <ul>
          <li v-for="social in socialsShown" :key="social['_id']" :style="{ '--color': social['color'] || undefined }">
            <a
              :href="social['url'] || ''"
              target="_blank"
              rel="noopener noreferrer"
              :title="social['name'] || undefined"
              :aria-label="social['name'] || undefined"
            >
              <Icon v-if="social['icon']" :name="social['icon']" />
            </a>
          </li>
        </ul>
      </div>

      <div class="footer-group">
        <p class="eyebrow">{{ t('footer.myFriends') }}</p>
        <ul>
          <li v-for="friend in friends" :key="friend['_key']" :style="{ '--color': friend['color'] || undefined, '--image': friendImage(friend['image']) }">
            <a
              :href="friend['url'] || ''"
              target="_blank"
              rel="noopener noreferrer"
              :title="friend['name'] || undefined"
              :aria-label="friend['name'] || undefined"
            >
              <span class="mask"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { SOCIALS_QUERY_RESULT } from '~~/sanity.types'

// Resolved during setup so the server and the client render the same footer.
const { t } = useTranslation()

const config = useRuntimeConfig()
const lastUpdated = config['public']['lastCommit']

const { data: socials } = await useContentQuery<SOCIALS_QUERY_RESULT>(SOCIALS_QUERY)
const { settings, query } = useSiteSettings()
await query

const socialsShown = computed(function () {
  return socials.value || []
})

const friends = computed(function () {
  return (settings.value?.footer?.friends || []).filter(function (friend) {
    return Boolean(friend['url'])
  })
})

const img = useImage()

function friendImage(image: (typeof friends.value)[number]['image']) {
  if (!hasImage(image)) {
    return 'none'
  }

  // The provider must be passed here: @nuxt/image resolves it before merging the preset.
  // @ts-expect-error -- @nuxt/image types $img() options with the default provider only
  const url = img(image['asset']['_ref'], {}, { provider: 'sanity', preset: 'friendLogo' })

  return `url(${url})`
}
</script>

<style scoped lang="scss">
#footer {
  background: var(--sky-zenith);
  border-top: 1px solid var(--sky-line);
  color: var(--star);
  padding-block: 2.5rem;

  .footer-inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: end;

    @media (width >= 640px) {
      grid-template-columns: 1fr auto auto;
      gap: 3rem;
    }
  }

  .footer-name {
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--star);
    text-decoration: none;

    &:hover {
      color: var(--green-light);
    }

    &:focus-visible {
      outline-color: var(--green-light);
    }
  }

  .footer-meta {
    margin: 0.35rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--star-dim);
  }

  .footer-group {
    .eyebrow {
      margin: 0 0 0.75rem;
      color: var(--star-dim);
    }

    ul {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      --size: 1.75rem;

      line-height: 0;
    }

    a {
      display: inline-block;
      color: var(--star);
      border-radius: 0.25rem;
      transition: transform 200ms ease;

      &:hover {
        transform: translateY(-2px);

        .iconify {
          color: var(--color);
        }

        .mask {
          background-color: var(--color);
        }
      }

      &:focus-visible {
        outline-color: var(--green-light);
      }
    }

    .iconify {
      font-size: var(--size);
      transition: color 200ms ease;
    }

    .mask {
      display: block;
      width: var(--size);
      height: var(--size);
      background-color: var(--star);
      mask-image: var(--image);
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
      -webkit-mask-image: var(--image);
      -webkit-mask-size: contain;
      -webkit-mask-position: center;
      -webkit-mask-repeat: no-repeat;
      transition: background-color 200ms ease;
    }
  }
}
</style>
