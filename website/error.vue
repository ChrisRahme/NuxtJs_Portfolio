<template>
  <NuxtLayout>
    <section id="error">
      <ul class="ambient" aria-hidden="true">
        <li
          v-for="(dot, index) in ambient"
          :key="index"
          :style="{
            'left': `${dot.x}%`,
            'top': `${dot.y}%`,
            '--size': `${dot.size}px`,
            '--twinkle-t': `${dot.twinkleTime}s`,
            '--twinkle-d': `${dot.twinkleDelay}s`,
          }"
        ></li>
      </ul>

      <div class="wrap error-inner">
        <div class="error-copy">
          <p class="eyebrow error-eyebrow">Error {{ statusCode }}</p>

          <h1 class="error-title">{{ title }}</h1>

          <p class="lead">{{ lead }}</p>

          <p v-if="is404 && requestedPath" class="requested">
            <span class="requested-label">Requested</span>
            <code class="requested-path">{{ requestedPath }}</code>
          </p>

          <div class="actions">
            <template v-if="is404">
              <button type="button" class="btn" @click="go('/')">Go home</button>
              <button type="button" class="btn-ghost on-sky" @click="go('/projects')">See projects</button>
            </template>

            <template v-else>
              <button type="button" class="btn" @click="retry">Try again</button>
              <button type="button" class="btn-ghost on-sky" @click="go('/')">Go home</button>
            </template>
          </div>
        </div>

        <figure class="error-sky" :aria-label="`The number ${statusCode} drawn as a constellation`">
          <svg class="code-sky" :viewBox="figure.viewBox" aria-hidden="true">
            <line
              v-for="(line, index) in figure.lines"
              :key="`l${index}`"
              class="line"
              :x1="line.x1"
              :y1="line.y1"
              :x2="line.x2"
              :y2="line.y2"
              :style="{ '--i': index }"
              pathLength="1"
            />

            <g
              v-for="(star, index) in figure.stars"
              :key="`s${index}`"
              class="star"
              :style="{
                '--i': index,
                '--twinkle-t': `${star.twinkleTime}s`,
                '--twinkle-d': `${star.twinkleDelay}s`,
              }"
            >
              <circle class="halo" :cx="star.x" :cy="star.y" :r="star.major ? 0.42 : 0.28" />
              <circle class="core" :cx="star.x" :cy="star.y" :r="star.major ? 0.15 : 0.1" />
            </g>
          </svg>
        </figure>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { mulberry32 } from '~/utils/random'

const props = defineProps({
  error: {
    type: Object,
    default: null,
  },
})

const statusCode = Number(props['error']?.['statusCode']) || 500
const is404 = statusCode === 404

const title = is404 ? 'Nothing charted here.' : 'Something broke along the way.'
const lead = is404
  ? 'This address does not point to a page. It may have moved, or it may never have existed.'
  : props['error']?.['message'] || 'The page failed to load. Reloading usually fixes it.'

useHead({
  title: `${statusCode} · Chris Rahmé`,
})

// Read on the client only, so the prerendered 404 page hydrates without a text mismatch.
const requestedPath = ref('')

onMounted(function () {
  requestedPath['value'] = window.location.pathname + window.location.search
})

function go(path) {
  clearError({ redirect: path })
}

function retry() {
  window.location.reload()
}

// Digit strokes on a 3 x 6 grid. Each stroke is a polyline of [x, y] points.
const DIGITS = {
  0: [
    [
      [0, 1],
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 5],
      [2, 6],
      [1, 6],
      [0, 5],
      [0, 1],
    ],
  ],
  1: [
    [
      [0.2, 1.4],
      [1.6, 0],
      [1.6, 6],
    ],
    [
      [0.6, 6],
      [2.6, 6],
    ],
  ],
  2: [
    [
      [0, 1],
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2.2],
      [0, 6],
      [3, 6],
    ],
  ],
  3: [
    [
      [0, 0],
      [3, 0],
      [1.2, 2.8],
      [2, 2.8],
      [3, 3.8],
      [3, 5],
      [2, 6],
      [1, 6],
      [0, 5],
    ],
  ],
  4: [
    [
      [2.4, 6],
      [2.4, 0],
      [0, 4.4],
      [3, 4.4],
    ],
  ],
  5: [
    [
      [3, 0],
      [0, 0],
      [0, 2.6],
      [2, 2.4],
      [3, 3.5],
      [3, 5],
      [2, 6],
      [1, 6],
      [0, 5],
    ],
  ],
  6: [
    [
      [3, 1],
      [2, 0],
      [1, 0],
      [0, 1],
      [0, 5],
      [1, 6],
      [2, 6],
      [3, 5],
      [3, 4],
      [2, 3],
      [1, 3],
      [0, 4],
    ],
  ],
  7: [
    [
      [0, 0],
      [3, 0],
      [1, 6],
    ],
  ],
  8: [
    [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
      [2, 3],
      [1, 3],
      [0, 2],
      [0, 1],
      [1, 0],
    ],
    [
      [1, 3],
      [0, 4],
      [0, 5],
      [1, 6],
      [2, 6],
      [3, 5],
      [3, 4],
      [2, 3],
    ],
  ],
  9: [
    [
      [0, 5],
      [1, 6],
      [2, 6],
      [3, 5],
      [3, 1],
      [2, 0],
      [1, 0],
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 2],
    ],
  ],
}

const DIGIT_WIDTH = 3
const DIGIT_HEIGHT = 6
const DIGIT_GAP = 1.8
const PADDING = 1
const JITTER = 0.22

function round(value) {
  return Math.round(value * 100) / 100
}

// Turns the status code into a constellation
function buildFigure(code) {
  const random = mulberry32(code * 7919)
  const digits = String(code).split('')
  const stars = []
  const lines = []

  digits.forEach(function (digit, digitIndex) {
    const strokes = DIGITS[digit] || DIGITS[0]
    const offsetX = PADDING + digitIndex * (DIGIT_WIDTH + DIGIT_GAP)
    const offsetY = PADDING
    const seen = new Map()

    strokes.forEach(function (stroke) {
      let previous = null

      stroke.forEach(function ([x, y]) {
        const key = `${x},${y}`
        let star = seen.get(key)

        if (!star) {
          star = {
            x: round(offsetX + x + (random() - 0.5) * 2 * JITTER),
            y: round(offsetY + y + (random() - 0.5) * 2 * JITTER),
            major: random() > 0.55,
            twinkleTime: round(3 + random() * 4),
            twinkleDelay: round(-random() * 6),
          }
          seen.set(key, star)
          stars.push(star)
        }

        if (previous) {
          lines.push({ x1: previous.x, y1: previous.y, x2: star.x, y2: star.y })
        }

        previous = star
      })
    })
  })

  const width = PADDING * 2 + digits.length * DIGIT_WIDTH + (digits.length - 1) * DIGIT_GAP
  const height = PADDING * 2 + DIGIT_HEIGHT

  return {
    stars,
    lines,
    viewBox: `0 0 ${width} ${height}`,
  }
}

function buildAmbient(count) {
  const random = mulberry32(404)
  const dots = []

  for (let index = 0; index < count; index++) {
    dots.push({
      x: round(random() * 100),
      y: round(random() * 100),
      size: random() > 0.75 ? 3 : 2,
      twinkleTime: round(4 + random() * 5),
      twinkleDelay: round(-random() * 8),
    })
  }

  return dots
}

const figure = buildFigure(statusCode)
const ambient = buildAmbient(36)
</script>

<style scoped lang="scss">
#error {
  container-type: inline-size;
  container-name: error;
  position: relative;
  min-height: calc(100vh - var(--header-height));
  min-height: calc(100svh - var(--header-height));
  display: flex;
  flex-direction: column;
  overflow: clip;
  color: var(--star);
  background:
    radial-gradient(70% 45% at 50% 100%, rgb(201, 112, 92, 0.42) 0%, rgb(201, 112, 92, 0) 100%),
    linear-gradient(180deg, var(--sky-zenith) 0%, var(--sky-mid) 55%, var(--sky-dusk) 88%, var(--sky-ground) 100%);

  .ambient {
    position: absolute;
    inset: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    pointer-events: none;

    li {
      position: absolute;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background: var(--star);
      opacity: 0.3;
      transform: translate(-50%, -50%);
      animation: twinkle var(--twinkle-t) ease-in-out infinite;
      animation-delay: var(--twinkle-d);
    }
  }

  .error-inner {
    position: relative;
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    place-items: center center;
    gap: 2.5rem;
    padding-block: clamp(2.5rem, 6vh, 4rem);
  }

  .error-copy {
    width: 100%;
    max-width: 34rem;
  }

  .error-eyebrow {
    margin: 0 0 0.75rem;
    color: var(--green-light);
  }

  .error-title {
    margin: 0 0 1.25rem;
    font-size: var(--fs-h1);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--star);
  }

  .lead {
    max-width: 30rem;
    margin: 0 0 1.5rem;
    font-size: var(--fs-lead);
    line-height: 1.6;
    color: rgb(244, 239, 230, 0.8);
  }

  .requested {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.35rem 0.75rem;
    margin: 0 0 2rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--star-dim);

    .requested-label {
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .requested-path {
      font: inherit;
      color: var(--star);
      overflow-wrap: anywhere;
      text-decoration: line-through;
      text-decoration-color: var(--sky-horizon);
      text-decoration-thickness: 1px;
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .btn:focus-visible {
    outline-color: var(--green-light);
  }

  .error-sky {
    width: min(100%, 26rem);
    margin: 0;
  }

  .code-sky {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;

    .line {
      stroke: var(--star-dim);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      opacity: 0.5;
      stroke-dasharray: 1;
      stroke-dashoffset: 0;
      animation: draw 700ms ease-out both;
      animation-delay: calc(500ms + var(--i) * 70ms);
    }

    .star {
      transform-box: fill-box;
      transform-origin: center;
      animation: rise 600ms ease-out both;
      animation-delay: calc(var(--i) * 45ms);

      .halo {
        fill: var(--star);
        opacity: 0.12;
      }

      .core {
        fill: var(--star);
        animation: twinkle var(--twinkle-t) ease-in-out infinite;
        animation-delay: var(--twinkle-d);
      }
    }
  }

  @container error (min-width: 56rem) {
    .error-inner {
      grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
      justify-items: stretch;
      gap: 3rem;
      padding-block: 2rem;
    }

    .error-sky {
      justify-self: center;
      width: min(100%, 30rem, calc(100svh - var(--header-height) - 12rem));
      min-width: min(100%, 16rem);
    }
  }

  @media (height < 620px) {
    min-height: 0;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes draw {
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.9;
  }

  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  #error .ambient li,
  #error .code-sky .line,
  #error .code-sky .star,
  #error .code-sky .core {
    animation: none !important;
  }
}
</style>
