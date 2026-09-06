<template>
  <div id="resume">
    <PageBand :eyebrow="resume?.eyebrow || ''" :title="resume?.title || siteTitle">
      <template #media>
        <NuxtImg class="avatar" src="/img/avatar.svg" alt="" width="96" height="96" />
      </template>

      <ul class="contacts">
        <li v-if="resume?.phone">
          <a :href="phoneHref">
            <Icon name="material-symbols:call" />
            <span>{{ resume.phone }}</span>
          </a>
        </li>
        <li v-if="resume?.email">
          <a :href="`mailto:${resume.email}`">
            <Icon name="material-symbols:mail" />
            <span>{{ resume.email }}</span>
          </a>
        </li>
      </ul>

      <template #aside>
        <a v-if="resume?.cv" class="btn" :href="resume.cv" target="_blank" rel="noopener noreferrer">
          <Icon name="material-symbols:download-rounded" />
          <span>{{ t('resume.downloadCv') }}</span>
        </a>
      </template>
    </PageBand>

    <div class="wrap page-body">
      <section class="intro reveal">
        <div class="summary">
          <RichText :value="resume?.summary" />
        </div>

        <dl class="facts">
          <div v-if="currentRole" class="fact">
            <dt>{{ t('resume.now') }}</dt>
            <dd>
              <span>{{ currentRole['title'] }}</span>
              <small>{{ currentRole['company'] }} · {{ t('resume.since', { date: formatMonth(currentRole['start']) }) }}</small>
            </dd>
          </div>
          <div class="fact">
            <dt>{{ t('resume.experience') }}</dt>
            <dd>
              <span>{{ t('resume.rolesIn', { count: careerRoles.length, span: experienceLabel }) }}</span>
            </dd>
          </div>
          <div v-if="latestDegree" class="fact">
            <dt>{{ t('resume.education') }}</dt>
            <dd>
              <span>{{ latestDegree['title'] }}</span>
              <small>{{ latestDegree['institution'] }} · {{ latestDegree['end'] }}</small>
            </dd>
          </div>
          <div class="fact">
            <dt>{{ t('resume.languages') }}</dt>
            <dd>
              <span>{{ spokenLanguages }}</span>
            </dd>
          </div>
        </dl>
      </section>

      <section id="experience" class="section reveal">
        <div class="section-head">
          <h2>{{ t('resume.experience') }}</h2>
          <p class="eyebrow">{{ t('resume.fullTime', { span: experienceLabel }) }}</p>
        </div>

        <Experience />
      </section>

      <section id="education" class="section reveal">
        <div class="section-head">
          <h2>{{ t('resume.education') }}</h2>
          <p class="eyebrow">{{ educationSpan }}</p>
        </div>

        <Education />
      </section>

      <section id="skills" class="section reveal">
        <div class="section-head">
          <h2>{{ t('resume.skills') }}</h2>
        </div>

        <Skills />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EDUCATION_QUERY_RESULT, EXPERIENCE_QUERY_RESULT, LANGUAGES_QUERY_RESULT } from '~~/sanity.types'
import PageBand from '~/components/PageBand.vue'
import Experience from '~/components/resume/Experience.vue'
import Education from '~/components/resume/Education.vue'
import Skills from '~/components/resume/Skills.vue'
import { yearsBetween } from '~/utils/dates'

const { t } = useTranslation()
const { formatMonth, formatYears } = useDates()

const { settings, query, siteTitle, siteDescription } = useSiteSettings()
await query
const { data: experience } = await useContentQuery<EXPERIENCE_QUERY_RESULT>(EXPERIENCE_QUERY)
const { data: education } = await useContentQuery<EDUCATION_QUERY_RESULT>(EDUCATION_QUERY)
const { data: languages } = await useContentQuery<LANGUAGES_QUERY_RESULT>(LANGUAGES_QUERY)

const resume = computed(function () {
  return settings.value?.resume
})

usePageMeta({
  title: computed(function () {
    return `${t('nav.resume')} | ${siteTitle.value}`
  }),
  description: computed(function () {
    return resume.value?.description || siteDescription.value
  }),
  path: '/resume',
})

const phoneHref = computed(function () {
  return `tel:${(resume.value?.phone || '').replace(/\s+/g, '')}`
})

// Every value below is derived from the content, so it never goes stale
const today = useTodayMonth()
const degrees = education.value || []
const latestDegree = degrees[degrees.length - 1] || null

const careerRoles = (experience.value || []).filter(function (item) {
  return item['career']
})
const firstRole = careerRoles[0] || null
const currentRole = careerRoles[careerRoles.length - 1] || null

const experienceLabel = computed(function () {
  return firstRole ? formatYears(yearsBetween(firstRole['start'], today.value)) : ''
})

const spokenLanguages = (languages.value || [])
  .filter(function (language) {
    return /professional/i.test(language['proficiency'] || '')
  })
  .map(function (language) {
    return language['name']
  })
  .join(' · ')

const educationSpan = degrees[0] && latestDegree ? `${degrees[0]['start']} — ${latestDegree['end']}` : ''

// Lifecycle
const route = useRoute()

onMounted(function () {
  // A hash (from the home page links) must keep its scroll target
  if (route.hash) {
    return
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style lang="scss" scoped>
#resume {
  .avatar {
    display: block;
    width: clamp(4.5rem, 10vw, 6rem);
    height: clamp(4.5rem, 10vw, 6rem);
    padding-top: 0.35rem;
    border-radius: 50%;
    background-color: var(--green-dark);
    box-shadow:
      0 0 0 4px rgb(244, 239, 230, 0.08),
      0 0 40px rgb(96, 192, 96, 0.25);
  }

  .contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.5rem;
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      overflow-wrap: anywhere;
      color: var(--star-dim);
      text-decoration: none;
      transition: color 200ms ease;

      &:hover {
        color: var(--star);
      }

      &:focus-visible {
        outline-color: var(--green-light);
      }

      .iconify {
        font-size: 1rem;
        color: var(--green-light);
      }
    }
  }

  .page-body {
    padding-block: clamp(2.5rem, 5vw, 4rem) var(--space-section);
  }

  .intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem 4rem;
    align-items: start;

    @media (width >= 56rem) {
      grid-template-columns: minmax(0, 38rem) minmax(20rem, 1fr);
    }
  }

  .summary {
    max-width: 38rem;
    font-size: clamp(1.0625rem, 1rem + 0.2vw, 1.125rem);
    line-height: 1.7;

    p {
      margin: 0 0 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    em {
      color: var(--purple);
      font-style: italic;
    }

    strong {
      color: var(--green-ink);
      font-weight: 600;
    }
  }

  .facts {
    margin: 0;
    border-top: 1px solid var(--line);

    .fact {
      display: grid;
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: 0.25rem 1rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid var(--line);
    }

    dt {
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      line-height: 1.6;
      color: var(--ink-2);
    }

    dd {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.45;
      color: var(--ink);

      span {
        font-weight: 500;
      }

      small {
        font-size: 0.8125rem;
        color: var(--ink-2);
      }
    }
  }

  .section {
    margin-top: var(--space-section);
  }
}
</style>
