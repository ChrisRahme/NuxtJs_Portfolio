<template>
  <div
    class="track"
    :class="{ interactive }"
    :role="interactive ? 'tablist' : undefined"
    :aria-label="interactive ? 'Roles by year' : undefined"
    @keydown="onKeydown"
  >
    <span class="axis" aria-hidden="true"></span>

    <span
      v-for="tick in ticks"
      :key="tick['key']"
      class="tick"
      :class="[tick['align'], { today: tick['today'] }]"
      :style="{ left: `${tick['x']}%` }"
      aria-hidden="true"
    >
      {{ tick['label'] }}
    </span>

    <component
      :is="interactive ? 'button' : NuxtLink"
      v-for="(stop, index) in stops"
      :key="stop['key']"
      ref="stopEls"
      class="stop"
      :class="[stop['align'], { active: index === selectedIndex, abuts: stop['abuts'] }]"
      :style="{ 'left': `${stop['x']}%`, 'width': `${stop['w']}%`, '--theme': stop['color'] }"
      v-bind="stopAttrs(stop, index)"
      @click="onClick(index)"
    >
      <span class="segment" aria-hidden="true"></span>
      <span class="dot" aria-hidden="true"></span>
      <span class="tip" aria-hidden="true">
        <span class="tip-company">{{ stop['company'] }}</span>
        <span class="tip-dates">{{ stop['dates'] }}</span>
      </span>
    </component>
  </div>
</template>

<script setup>
import { currentMonth, formatMonth, monthIndex, yearOf } from '~/utils/dates'
import { slugify } from '~/utils/text'

const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  selectedIndex: {
    type: Number,
    default: -1,
  },
  interactive: {
    type: Boolean,
    default: true,
  },
  today: {
    type: String,
    default() {
      return currentMonth()
    },
  },
})

const emit = defineEmits(['select'])

const stopEls = ref([])

function round(value) {
  return Math.round(value * 100) / 100
}

function alignAt(x, margin) {
  if (x < margin) {
    return 'left'
  }

  if (x > 100 - margin) {
    return 'right'
  }

  return 'center'
}

const domain = computed(function () {
  const start = monthIndex(props['items'][0]['start'])
  const end = monthIndex(props['today']) + 1

  return { start, end, span: Math.max(1, end - start) }
})

function toPercent(index) {
  return round(((index - domain.value['start']) / domain.value['span']) * 100)
}

const stops = computed(function () {
  return props['items'].map(function (item, index) {
    const startIndex = monthIndex(item['start'])
    const endIndex = item['end'] ? monthIndex(item['end']) : monthIndex(props['today']) + 1
    const x = toPercent(startIndex)
    const next = props['items'][index + 1]

    return {
      key: `${item['company']}-${item['start']}`,
      x,
      w: round((Math.max(1, endIndex - startIndex) / domain.value['span']) * 100),
      abuts: Boolean(next) && monthIndex(next['start']) <= endIndex,
      align: alignAt(x, 12),
      color: item['color'] || 'var(--green)',
      company: item['company'],
      title: item['title'],
      dates: `${formatMonth(item['start'])} – ${formatMonth(item['end'])}`,
    }
  })
})

const ticks = computed(function () {
  const firstYear = yearOf(props['items'][0]['start'])
  const lastYear = yearOf(props['today'])
  const result = []

  // One tick per January inside the axis; the first year only gets one when the axis starts in January
  for (let year = firstYear; year <= lastYear; year++) {
    const x = toPercent(monthIndex(`${year}-01`))
    if (x < 0) {
      continue
    }

    result.push({ key: String(year), x, label: String(year), align: alignAt(x, 2), today: false })
  }

  result.push({ key: 'today', x: 100, label: 'today', align: 'right', today: true })

  return result
})

function stopAttrs(stop, index) {
  const label = `${stop['title']}, ${stop['company']}, ${stop['dates']}`

  if (props['interactive']) {
    return {
      'type': 'button',
      'role': 'tab',
      'aria-selected': index === props['selectedIndex'],
      'aria-label': label,
      'tabindex': index === props['selectedIndex'] ? 0 : -1,
    }
  }

  return {
    'to': { path: '/resume', query: { role: slugify(stop['company']) }, hash: '#experience' },
    'aria-label': `${label}. Open on the resume page`,
  }
}

function onClick(index) {
  if (props['interactive']) {
    emit('select', index)
  }
}

function onKeydown(event) {
  if (!props['interactive']) {
    return
  }

  const last = props['items'].length - 1
  const current = props['selectedIndex']
  let next = null

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    next = Math.min(last, current + 1)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    next = Math.max(0, current - 1)
  } else if (event.key === 'Home') {
    next = 0
  } else if (event.key === 'End') {
    next = last
  }

  if (next === null) {
    return
  }

  event.preventDefault()
  emit('select', next)

  nextTick(function () {
    const element = stopEls.value[next]
    if (element && element.focus) {
      element.focus()
    }
  })
}
</script>

<style lang="scss" scoped>
.track {
  --line-y: 2rem;

  position: relative;
  height: 3.75rem;

  .axis {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(var(--line-y) - 1px);
    height: 2px;
    border-radius: 1px;
    background: var(--line);
  }

  .tick {
    position: absolute;
    top: calc(var(--line-y) + 0.7rem);
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.06em;
    line-height: 1.4;
    white-space: nowrap;
    color: var(--ink-2);

    // Tick mark between the label and the axis
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 100%;
      width: 1px;
      height: 0.35rem;
      margin-bottom: 0.1rem;
      background: var(--line);
    }

    &.left {
      transform: none;

      &::before {
        left: 0;
      }
    }

    &.right {
      transform: translateX(-100%);

      &::before {
        left: auto;
        right: 0;
      }
    }

    &.today {
      color: var(--green-ink);

      &::before {
        background: var(--green);
      }
    }

    @media (width < 30rem) {
      font-size: 0.5625rem;
    }
  }

  // The "today" label collides with the last year label on narrow tracks
  @media (width < 36rem) {
    .tick.today {
      display: none;
    }
  }

  .stop {
    position: absolute;
    top: calc(var(--line-y) - 1rem);
    height: 2rem;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    .segment {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(50% - 2px);
      height: 4px;
      border-radius: 2px;
      background: var(--theme);
      opacity: 0.55;
      transition:
        opacity 200ms ease,
        box-shadow 200ms ease;
    }

    .dot {
      position: absolute;
      left: 0;
      top: 50%;
      width: 1rem;
      height: 1rem;
      transform: translate(-50%, -50%);
      border: 2px solid var(--line);
      border-radius: 50%;
      background: var(--card);
      transition:
        border-color 200ms ease,
        background-color 200ms ease,
        transform 200ms ease;
    }

    .tip {
      position: absolute;
      left: 0;
      bottom: calc(100% + 0.25rem);
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      padding: 0.4rem 0.6rem;
      border-radius: 0.5rem;
      background: var(--sky-zenith);
      color: var(--star);
      font-family: var(--font-mono);
      font-size: 0.625rem;
      letter-spacing: 0.04em;
      line-height: 1.4;
      white-space: nowrap;
      box-shadow: var(--shadow-card);
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms ease;

      .tip-company {
        color: var(--star);
      }

      .tip-dates {
        color: var(--star-dim);
      }
    }

    // A hairline of paper between two roles that follow each other directly
    &.abuts .segment {
      right: 3px;
    }

    &.center .tip {
      transform: translateX(-50%);
    }

    &.left .tip {
      transform: translateX(-0.5rem);
    }

    &.right .tip {
      transform: translateX(calc(-100% + 0.5rem));
    }

    &:hover,
    &:focus-visible {
      z-index: 3;

      .segment {
        opacity: 0.8;
      }

      .dot {
        border-color: var(--theme);
        transform: translate(-50%, -50%) scale(1.15);
      }

      .tip {
        opacity: 1;
      }
    }

    &.active {
      z-index: 2;

      .segment {
        opacity: 1;
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme) 22%, transparent);
      }

      .dot {
        border-color: var(--green);
        background: var(--green);
      }
    }

    &:focus-visible {
      outline: none;

      .dot {
        outline: 2px solid var(--green);
        outline-offset: 3px;
      }
    }
  }

  // Narrow tracks are read, not clicked: the pager (or the resume link) does the selecting
  @media (width < 48rem) {
    .stop {
      pointer-events: none;

      &:not(.active) .dot {
        display: none;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .track .stop {
    .segment,
    .dot,
    .tip {
      transition: none;
    }
  }
}
</style>
