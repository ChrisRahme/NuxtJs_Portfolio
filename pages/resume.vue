<template>
  <div id="resume">
    <PageBand eyebrow="Full-stack & AI engineer" title="Chris Rahmé">
      <template #media>
        <NuxtImg class="avatar" src="/img/avatar.svg" alt="" width="96" height="96" />
      </template>

      <ul class="contacts">
        <li>
          <a href="tel:+96171283701">
            <Icon name="material-symbols:call" />
            <span>+961 71 283 701</span>
          </a>
        </li>
        <li>
          <a href="mailto:christopher.rahme@gmail.com">
            <Icon name="material-symbols:mail" />
            <span>christopher.rahme@gmail.com</span>
          </a>
        </li>
      </ul>

      <template #aside>
        <a class="btn" href="/docs/Chris%20Rahm%C3%A9%20CV.pdf" target="_blank" rel="noopener noreferrer">
          <Icon name="material-symbols:download-rounded" />
          <span>Download CV</span>
        </a>
      </template>
    </PageBand>

    <div class="wrap page-body">
      <section class="intro reveal">
        <div class="summary">
          <p>
            I am a <em>full-stack software engineer</em> with a passion for <em>AI and machine learning</em>. Over the years, I've developed expertise in
            full-stack, containerized solutions, mainly utilizing technologies such as <em>VueJs</em>, <em>Python</em>, and <em>Docker</em>, and various AI &
            machine learning frameworks such as <em>Keras</em> and <em>Scikit-Learn</em>.
          </p>
          <p>
            I am driven by a focus on code <strong>quality</strong>, <strong>readability</strong>, <strong>efficiency</strong>, and
            <strong>scalability</strong>, and always strive to learn and stay up-to-date with new technologies.
          </p>
        </div>

        <!-- Every value below is derived from the data files, so it never goes stale -->
        <dl class="facts">
          <div class="fact">
            <dt>Now</dt>
            <dd>
              <span>{{ currentRole['title'] }}</span>
              <small>{{ currentRole['company'] }} · since {{ formatMonth(currentRole['start']) }}</small>
            </dd>
          </div>
          <div class="fact">
            <dt>Experience</dt>
            <dd>
              <span>{{ careerRoles.length }} roles in {{ experienceLabel }}</span>
            </dd>
          </div>
          <div class="fact">
            <dt>Education</dt>
            <dd>
              <span>{{ latestDegree['title'] }}</span>
              <small>{{ latestDegree['institution'] }} · {{ latestDegree['end'] }}</small>
            </dd>
          </div>
          <div class="fact">
            <dt>Languages</dt>
            <dd>
              <span>{{ spokenLanguages }}</span>
            </dd>
          </div>
        </dl>
      </section>

      <section id="experience" class="section reveal">
        <div class="section-head">
          <h2>Experience</h2>
          <p class="eyebrow">{{ experienceLabel }} full-time</p>
        </div>

        <Experience />
      </section>

      <section id="education" class="section reveal">
        <div class="section-head">
          <h2>Education</h2>
          <p class="eyebrow">{{ educationSpan }}</p>
        </div>

        <Education />
      </section>

      <section id="skills" class="section reveal">
        <div class="section-head">
          <h2>Skills</h2>
        </div>

        <Skills />
      </section>
    </div>
  </div>
</template>

<script setup>
import PageBand from '~/components/PageBand.vue'
import Experience from '~/components/resume/Experience.vue'
import Education from '~/components/resume/Education.vue'
import Skills from '~/components/resume/Skills.vue'
import { experience } from '~/data/experience'
import { education } from '~/data/education'
import { languages } from '~/data/languages'
import { formatMonth, formatYears, yearsBetween } from '~/utils/dates'

useHead({
  title: 'Resume | Chris Rahmé',
  meta: [
    { name: 'description', content: 'Resume of Chris Rahmé — full-stack and AI engineer. Experience, education, and skills.' },
    { property: 'og:title', content: 'Resume | Chris Rahmé' },
    { property: 'og:description', content: 'Resume of Chris Rahmé — full-stack and AI engineer. Experience, education, and skills.' },
    { property: 'og:url', content: 'https://chrisrahme.dev/resume' },
    { name: 'twitter:title', content: 'Resume | Chris Rahmé' },
    { name: 'twitter:description', content: 'Resume of Chris Rahmé — full-stack and AI engineer. Experience, education, and skills.' },
  ],
})

const today = useTodayMonth()
const latestDegree = education[education.length - 1]

const careerRoles = experience.filter(function (item) {
  return item['career']
})
const currentRole = careerRoles[careerRoles.length - 1]

const experienceLabel = computed(function () {
  return formatYears(yearsBetween(careerRoles[0]['start'], today.value))
})

const spokenLanguages = languages
  .filter(function (language) {
    return /professional/i.test(language['proficiency'])
  })
  .map(function (language) {
    return language['language']
  })
  .join(' · ')

const educationSpan = `${education[0]['start']} — ${latestDegree['end']}`

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
