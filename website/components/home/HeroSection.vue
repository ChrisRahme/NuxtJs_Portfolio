<template>
  <section id="hero">
    <div class="wrap hero-inner">
      <div class="hero-copy">
        <!-- <NuxtImg class="avatar" src="/img/avatar.svg" alt="" width="72" height="72" /> -->

        <p v-if="hero?.heroEyebrow" class="eyebrow hero-eyebrow">{{ hero.heroEyebrow }}</p>

        <h1 class="hero-name">{{ hero?.heroTitle || 'Chris Rahmé' }}</h1>

        <p v-if="hero?.heroLead" class="lead">{{ hero.heroLead }}</p>

        <div class="actions">
          <NuxtLink to="/projects" class="btn">{{ t('hero.seeProjects') }}</NuxtLink>
          <NuxtLink to="/resume" class="btn-ghost on-sky">{{ t('hero.readResume') }}</NuxtLink>
        </div>
      </div>

      <SkillConstellation class="hero-sky" />
    </div>

    <QuoteBar />
  </section>
</template>

<script setup lang="ts">
import SkillConstellation from '~/components/home/SkillConstellation.vue'
import QuoteBar from '~/components/home/QuoteBar.vue'

const { t } = useTranslation()

const { settings, query } = useSiteSettings()
await query

const hero = computed(function () {
  return settings.value?.home
})
</script>

<style scoped lang="scss">
#hero {
  container-type: inline-size;
  container-name: hero;
  display: flex;
  flex-direction: column;
  overflow: clip;
  color: var(--star);
  background:
    radial-gradient(60% 45% at 50% 100%, rgb(201, 112, 92, 0.35) 0%, rgb(201, 112, 92, 0) 100%),
    linear-gradient(180deg, var(--sky-zenith) 0%, var(--sky-mid) 55%, var(--sky-dusk) 88%, var(--sky-ground) 100%);

  .hero-inner {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    place-items: center center;
    gap: 2.5rem;
    padding-block: clamp(2.5rem, 6vh, 4rem) 1.5rem;
  }

  .hero-copy {
    width: 100%;
    max-width: 34rem;
  }

  .avatar {
    display: block;
    width: 4.5rem;
    height: 4.5rem;
    margin-bottom: 1.5rem;
    padding-top: 0.35rem;
    border-radius: 50%;
    background-color: var(--green-dark);
    box-shadow:
      0 0 0 4px rgb(244, 239, 230, 0.08),
      0 0 40px rgb(96, 192, 96, 0.25);
  }

  .hero-eyebrow {
    margin: 0 0 0.75rem;
    color: var(--green-light);
  }

  .hero-name {
    margin: 0 0 1.25rem;
    font-size: var(--fs-hero);
    font-weight: 600;
    line-height: 1.02;
    letter-spacing: -0.03em;
    color: var(--star);
  }

  .lead {
    max-width: 30rem;
    margin: 0 0 2rem;
    font-size: var(--fs-lead);
    line-height: 1.6;
    color: rgb(244, 239, 230, 0.8);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .hero-sky {
    width: min(100%, 32rem);
  }

  // Two columns once the section is wide enough
  @container hero (min-width: 56rem) {
    .hero-inner {
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      justify-items: stretch;
      gap: 3rem;
      min-height: calc(100vh - var(--header-height));
      min-height: calc(100svh - var(--header-height));
      padding-block: 2rem;
    }

    .hero-sky {
      justify-self: center;
      width: min(100%, 36rem, calc(100svh - var(--header-height) - 11rem));
      min-width: min(100%, 18rem);
    }
  }

  @media (height < 620px) {
    .hero-inner {
      min-height: 0;
    }
  }
}
</style>
